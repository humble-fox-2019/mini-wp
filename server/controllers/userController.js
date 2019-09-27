const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {

    static create(req, res, next) {
        const { cloudStoragePublicUrl } = req.file;
        const { username, email, password } = req.body;
        User.create({
            img: cloudStoragePublicUrl,
            username,
            email,
            password
        })
            .then(function (user) {
                res.status(201).json(user);
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                if (user) {
                    if (comparePassword(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id,
                            name: user.username,
                            email: user.email
                        }
                        let token = generateToken(payload)

                        res.status(200).json({
                            token,
                            name: user.username,
                            img: user.img
                        })
                    }
                    else {
                        next({ code: 400, message: "wrong email/password" });
                    }
                }
                else {
                    next({ code: 400, message: "wrong email/password" });
                }
            })
            .then(DATA => {
                console.log('JALAN')
            })
            .catch(next)
    }


}

module.exports = UserController;