const User = require('../models/user');
const { jwt } = require('../helpers');
const { bcrypt } = require('../helpers');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class UserController {
    static signup(req, res, next) {
        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        const { email, password } = req.body;
        if (email === undefined || email === '') {
            return next({ statusCode: 400, msg: 'email is required' })
        }

        if (password === undefined || password === '') {
            return next({ statusCode: 400, msg: 'password is required' })
        }
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    next({ statusCode: 400, msg: "email/password not found" });
                } else {

                    if (bcrypt.compare(password, user.password)) {
                        let userData = {
                            'name': user.name,
                            'id': user._id,
                            'email': user.email,
                            'image': user.image
                        }

                        let token = jwt.generateToken(userData);
                        res.status(200).json({ token, userData })
                    } else {
                        next({ statusCode: 400, msg: "email/password not found" });
                    }
                }
            })
            .catch(next)
    }

    static Gsignin(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: GOOGLE_CLIENT_ID
        }).then(ticket => {
            const { email, given_name, family_name, picture } = ticket.getPayload()
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return User.create({
                            "name": given_name + ' ' + family_name,
                            "image": picture,
                            "email": email,
                            "password": process.env.DEFAULT_PASSWORD
                        })
                    } else {
                        return user
                    }
                }).then(user => {

                    let userData = {
                        'name': user.name,
                        "id": user._id,
                        "email": user.email,
                        "image": user.image
                    }

                    let token = jwt.generateToken(userData);
                    res.status(200).json({ token, userData });
                })
                .catch(next)
        }).catch(next)
    }

    static search(req, res, next) {
        if (!req.query.name) {
            next({ statusCode: 400, msg: 'Enter user name first' })
        } else {
            User.find({ "name": { $regex: '.*' + req.query.name + '.*', $options: 'i' } })
                .populate('articles')
                .then(users => {
                    if (users.length > 0) {
                        res.status(200).json(users);
                    } else {
                        next({ statusCode: 404 });
                    }
                }).catch(next);
        }

    }

    static findOne(req, res, next) {
        User.findOne({
            _id: req.params.id
        })
            .populate('articles')
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static update(req, res, next) {
        const { name, email, image, password } = req.body;
        const data = { name, email, image, password };

        User.updateOne({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then((info) => {
                res.status(200).json({ message: 'successfully updated', data: info });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        User.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = UserController