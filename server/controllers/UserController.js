const User = require('../models/User')
const { comparePassword } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {

  static signin(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(user) {
          if(comparePassword(password, user.password)) {
            const token = sign({ id: user._id, username: user.username, email: user.email })
            res.json({ token, username: user.username })
          }else {
            return next({
              status: 401,
              message: 'Wrong email/password'
            })
          }
        }else {
          return next({
            status: 401,
            message: 'Wrong email/password'
          })
        }
      })
  }

  static signup(req, res, next) {
    const { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        res.status(201).json({
          data: user
        })
      })
      .catch(next)
  }

  static signinGoogle(req, res, next) {

    let payload = null

    client.verifyIdToken({
      idToken: req.headers.idtoken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(data => {
        payload = data.payload
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if(user) {
          return user
        }else{
          return User.create({
            username: payload.given_name,
            password: process.env.DEFAULT_PASSWORD,
            email: payload.email
          })
        }
      })
      .then(user => {
        const token = sign({ id: user._id, username: user.username, email: user.email })
        res.json({ token, username: user.username })
      })
      .catch(next)
  }

}


module.exports = UserController