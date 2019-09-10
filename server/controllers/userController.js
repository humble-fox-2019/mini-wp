const User = require('../models/user')
const { getToken } = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bycrptjs')

class UserController {
  static create(req, res, next) {
    console.log(req.body);
    const { name, email, password } = req.body
    User.create({
      name,
      email,
      password
    })
      .then(data => {
        console.log('here?');
        console.log(data);
        res.status(200).json({
          message: 'Success Create',
          user: data
        })
      })
      .catch(err => {
        console.log('>>>', err);
        next({
          status: 400,
          error: err
        })
      })
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        status: 400,
        message: 'Email/Password is required'
      })
    }
    else {
      User.findOne({ email })
      .then(isFound => {
        if (isFound) {
          const { _id, name, email } = isFound
          if (comparePassword(password, isFound.password)) {
            let payload = {
              _id,
              name,
              email,
            }
            res.status(200).json({
                token: getToken(payload),
              })
            }
            else {
              next({
                status: 400,
                message: 'Wrong email/password'
              })
            }
          }
          else {
            next({
              status: 400,
              message: 'Wrong email/password'
            })
          }
        })
        .catch(err => {
          next()
        })
    }
  }
}

module.exports = UserController