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
            res.status(201).json({
                name, email
            });
        }).catch(next);
    }

    static signin(req, res, next) {
        const { email, password } = req.body;

        User.findOne({email})
            .then(user => {
                if (user) {
                    if(comparePassword(password, user.password)) {
                        const payload = {
                            author: user.id,
                            name: user.name,
                            email: user.email
                        }

                        const token = generateToken(payload);
                        
                        res.status(200).json({
                            // author: user.id,
                            // name: user.name,
                            // email: user.email,
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