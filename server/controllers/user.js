const { OAuth2Client } = require("google-auth-library");
const models = require("../models");
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

if (process.env.NODE_ENV === "dev") require("dotenv").config();

class User {
  static register(req, res, next) {
    const { name, email, password } = req.body;

    models.User.create({
      name,
      email,
      password
    })
      .then(user => {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        };
        let token = jwt.generate(payload);
        res.status(200).json({
          token
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    models.User.findOne({
      email
    })
      .then(user => {
        if (!user || !bcrypt.compare(password, user.password)) {
          next({
            status: 400,
            message: `invalid username / password !`
          });
        } else {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          };

          let token = jwt.generate(payload);

          res.status(200).json({
            token
          });
        }
      })
      .catch(next);
  }

  static googleSignIn(req, res, next) {
    const client = new OAuth2Client(
      process.env.CLIENT_ID
    );

    let payload;
    client
      .verifyIdToken({
        idToken: req.headers.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload();

        return models.User.findOne({
          email: payload.email
        });
      })
      .then(user => {
        if (!user) {
          //create new user
          return models.User.create({
            name: payload.name,
            email: payload.email,
            password: String(Math.floor(Math.random() * 99999999))
          });
        } else {
          //user already exist
          return user;
        }
      })
      .then(user => {
        const token = jwt.generate({
          name: payload.name,
          email: payload.email,
          _id: user._id
        });
        res.status(200).json({
          token
        });
      })
      .catch(next);
  }
}

module.exports = User;