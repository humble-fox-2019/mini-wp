const { compare } = require('../helpers/bcrypt');
const { generateToken } =require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const CLIENT_ID = process.env.CLIENT_ID

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

  


}


module.exports = UserController;