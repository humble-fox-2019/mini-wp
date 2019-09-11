const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static signup(req, res, next) {
        const { name, email, password } = req.body;
        User.create({
            name, 
            email,
            password
        }).then(user => {
            res.status(201).json(user);
        }).catch(next);
    }

    static signin(req, res, next) {
        const { email, password } = req.body;

        User.findOne({email})
            .then(user => {
                if (user) {
                    if(comparePassword(password, user.password)) {
                        const payload = {
                            UserId: user.id,
                            name: user.name
                        }

                        const token = generateToken(payload);
                        
                        res.status(200).json({
                            UserId: user.id,
                            name: user.name,
                            token
                        })
                        
                    } else {
                        next({status: 400, message: 'Wrong email/password'})
                    }
                } else {
                    next({status: 400, message: 'Wrong email/password'})
                }
            })
            .catch(next);
    }
}

module.exports = UserController;