const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const verifyGoogle = require('../helpers/google')

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then((user) => {
        res.status(201).json({ message: 'Register success', token: generateToken({ id: user._id, name: user.name }) })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (compareHash(password, user.password)) {
            res.status(200).json({ message: 'Login success', token: generateToken({ id: user._id, name: user.name }) })
          } else {
            next({ status: 401, message: 'Invalid login or password' })
          }
        } else next({ status: 401, message: 'Invalid login or password' })
      })
      .catch(next)
  }

  static google(req, res, next) {
    console.log('google')
    let payload
    verifyGoogle(req.headers.id_token)
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: payload.name,
            email: payload.email,
            password: 'chocolate'
          })
        }
      })
      .then(user => {
        const token = generateToken({ id: user._id, email: user.email })
        res.status(200).json({ token })
      })
      .catch(next)
  }
}

module.exports = UserController