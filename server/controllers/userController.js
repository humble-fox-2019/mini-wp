const User = require('../models/user')
const { getToken } = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bycrptjs')
const {OAuth2Client} = require('google-auth-library')
const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)

class UserController {
  static create(req, res, next) {
    // console.log(req.body);
    const { name, email, password } = req.body
    User.create({
      name,
      email,
      password
    })
      .then(data => {
        // console.log('here?');

        res.status(200).json({
          message: 'Success Create',
          user: data
        })
      })
      .catch(err => {
        // console.log('>>>', err);
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
        message: 'Email/password is required'
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
        .catch(next)
    }
  }

  static signInGoogle(req, res) {
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: clientID
    })
      .then(user => {
        let password = 'happymeal123'
        let { email, name } = user.payload
        User.findOne({ email })
        .then(isFound => {
          if (isFound) {
              return isFound
            }
            else {
              return User.create({
                name : name,
                email : email,
                password
              })
            }
          })
          .then(userLogin => {
            let payload = {
              _id: userLogin._id,
              name : userLogin.name,
              email: userLogin.email
            }
            console.log(userLogin.email);
            console.log(userLogin._id);
            let token = getToken(payload)
            res.status(200).json({
              token
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
}

module.exports = UserController