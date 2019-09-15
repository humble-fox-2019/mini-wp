const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_RANDOM_PWD = process.env.GOOGLE_RANDOM_PWD;

class UserController {
    static getUser(req, res, next) {
        const _id = req.decoded.author;

        User.findOne({_id})
            .then(user => {
                res.status(200).json(user);
            })
            .catch(next);
    }

    static signup(req, res, next) {
        const { name, email, password } = req.body;
        User.create({
            name, 
            email,
            password
        }).then(user => {
            res.status(201).json({
                name, email
            });
        }).catch(next);
    }

    static signin(req, res, next) {
        const { email, password } = req.body;

        User.findOne({email})
            .then(user => {
                if (user) {
                    if(comparePassword(password, user.password)) {
                        const payload = {
                            author: user.id,
                            name: user.name,
                            email: user.email
                        }

                        const token = generateToken(payload);
                        
                        res.status(200).json({
                            name: user.name,
                            token
                        })
                        
                    } else {
                        next({status: 400, message: 'Wrong email/password'})
                    }
                } else {
                    next({status: 400, message: 'Wrong email/password'})
                }
            })
            .catch(next);
    }

    static googleSignIn(req, res, next) {
        const { idToken } = req.body;
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        let payload;
        
        client.verifyIdToken({
            idToken: idToken,
            audience: GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            console.log(ticket)

            return User.findOne({email: payload.email})
        })
        .then(user => {
            if (user) {
                return user
            } else {
                return User.create({
                    name : payload.name,
                    email : payload.email,
                    password: GOOGLE_RANDOM_PWD
                })
            }
        })
        .then(user => {
            const payload = {
                author: user.id,
                name: user.name,
                email: user.email
            }
            let token = generateToken(payload);
            
            res.status(201).json({
                name: user.name,
                token
            });
        })
        .catch(next)
    }
}

module.exports = UserController;