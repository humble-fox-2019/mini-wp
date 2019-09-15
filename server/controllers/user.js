
const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')

const clientId = process.env.GOOGLE_CLIENT_ID
const defaultPassword = process.env.DEFAULT_PASSWORD
const client = new OAuth2Client(clientId)

class UserController {
    static register(req, res, next) {
        let { email, password } = req.body

        User.create({ email, password })
            .then(user => {
                res.status(201).json({ _id: user._id, email: user.email })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(user => {
                if (user && compareHash(password, user.password)) {
                    const token = generateToken({
                        userId: user._id,
                        email
                    })

                    res.status(200).json({ token })
                } else next({
                    status: 403,
                    message: `Invalid username / password`
                })
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        const { id_token } = req.body
        let payload

        client.verifyIdToken({
            idToken: id_token,
            audience: clientId
        })
            .then(ticket => {
                payload = ticket.getPayload()

                return User.findOne({ email: payload.email })
            })
            .then(user => {
                if (user) {
                    console.log(`user already registered`)
                    return user
                } else {
                    console.log(`user not registered yet`)

                    return User.create({
                        email: payload.email,
                        password: defaultPassword
                    })
                }
            })
            .then(user => {
                const token = generateToken({
                    userId: user._id,
                    email: payload.email
                })

                res.status(200).json({ token })
            })
            .catch(next)
    }
}

module.exports = UserController