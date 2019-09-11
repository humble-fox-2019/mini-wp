const User = require('../models/User')
const { comparePassword } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')

class UserController {

  static signin(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(user) {
          if(comparePassword(password, user.password)) {
            const token = sign({ id: user._id, username: user.username, email: user.email })
            res.json({ token })
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

}


module.exports = UserController