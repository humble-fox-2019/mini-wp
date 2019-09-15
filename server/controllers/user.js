const { compare } = require('../helpers/bcrypt');
const { generateToken } =require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client( CLIENT_ID )

class UserController {
    static login ( req, res ,next ) {
        const { email , password } = req.body
        User.findOne({ email })
        .then( user => {
            if ( user ) {
                if ( compare( password , user.password ) ) {
                    const token = generateToken({
                        id : user._id,
                        email : user.email
                    })
                    res.status(200).json({ status : 200 , token });
                } else {
                    next({ status : 404 , message: "Invalid Username/Password" });
                }
            } else {
                next({ status : 404 , message : "Invalid Username/Password"})
            }
        })
        .catch( next );
    }
    static register( req, res ,next ) {
        const { username, email ,password } = req.body;
      
        User.create({ username , email , password })
        .then ( createdUser => {
            res.status(201).json({ status : 201 , message : "User Registered" , createdUser})
        })
        .catch ( next )
    }

    static googleSignIn ( req, res ,next ) {
        const token = req.body.idToken;
        let payload = null;
        client.verifyIdToken({
            idToken : token ,
            audience : CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload();
            return User.findOne({ email : payload.email })
        })
        .then ( foundUser => {
            if ( foundUser )
                return foundUser
            else {
                return User.create({ email : payload.email , password : process.env.DEFAULT_PASSWORD , username : payload.name })
            }
        })
        .then ( user => {
            const token = generateToken ({
                id : user._id,
                email : user.email
            })
            res.status(200).json({ status: 200 , message : "Login Success" , token })
        })
        .catch( next )
    }


}


module.exports = UserController;