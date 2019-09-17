const User = require('../models/user')
const {
    OAuth2Client
} = require('google-auth-library')
const Article = require('../models/article')
const {
    tokenGenerate
} = require('../helpers/jwt')
const {
    comparePassword
} = require('../helpers/bcryptjs')


class UserController {

    static findOne(req, res, next) {
        const dataUser = null
        const {
            email
        } = req.body
        User.findOne({
                email
            })
            .then(user => {
                dataUser = user
                return Article.find({
                    author: user._id
                })
            })
            .then(articles => {
                res.status(200).json({
                    user: dataUser,
                    articles
                })
            })
            .catch(next)
    }

    static register(req, res, next) {
        const {
            name,
            email,
            password
        } = req.body
        User.create({
                name,
                password,
                email
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const {
            email,
            password
        } = req.body
        User.findOne({
                email
            })
            .then(user => {
                let payload = {
                    id: user._id,
                    email: user.email
                }

                if (user && comparePassword(password, user.password)) {
                    let token = tokenGenerate(payload)
                    res.status(201).json({
                        message: `Login Success`,
                        id: user._id,
                        token
                    })
                } else {
                    next({
                        status: 400,
                        message: `Email/Password not valid`
                    })
                }
            })
            .catch(err => {
                next({
                    status: 400,
                    message: `Email/Password not valid`
                })
            })
    }

    static signin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
        let payload = null;
        client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIENT_ID_GOOGLE
            })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({
                    email: payload.email
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        name: payload.name,
                        password: process.env.PASSWORD_USER,
                        email: payload.email
                    })
                }
            })
            .then(user => {
                const token = tokenGenerate({
                    id: user._id,
                    email: user.email
                })
                res.status(201).json({
                    mesage: `Logged In Success`,
                    token,
                    id: user._id
                })
            })
            .catch(next)

    }

    static changePassword(req, res, next) {
        let password = req.body.password
        User.findOne({
                _id: req.params.id
            })
            .then(user => {
                if (!user) {
                    next({
                        status: 204,
                        message: `User not found`
                    })
                } else {
                    user.password = password
                    user.save()
                }
            })
            .catch(next)

    }

}

module.exports = UserController