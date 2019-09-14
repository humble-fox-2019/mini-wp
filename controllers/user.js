const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(_ => {
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
}

module.exports = UserController