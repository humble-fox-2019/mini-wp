const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

    static create (req,res, next){
        User.create({
            username : req.body,username,
            gender : req.body.gender,
            location : req.body.location,
            age : req.body.age,
            profession : req.body.profession,
            appearance : req.body.appearance,
            interests : req.body.interests,
            avatar : req.body.avatar,
            banner : req.body.banner,
            email : req.body.email,
            password : req.body.password
        }).then ((user) =>{
            let payload = {
                id : user._id,
                email : user.email
            }
            let token = generateToken(payload)
            res.status(200).json({
                user,
                token
            })
        }).catch (next)
    }

    static findAll (req,res,next){
        User.find().then((users)=>{
            res.status(200).json({
                users
            })
        }).catch(next)
    }

    static login (req,res,next){
        User.findOne({email : req.body.email}).then((user)=>{
            if (!user) {
                throw {
                    name : "NotFound",
                    customMessage : "user not found in database"
                }
            } else {
                if (comparePassword(req.body.password, user.password)) {
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({
                        user,
                        token
                    })
                } else {
                    throw {
                        name : "Bad Request",
                        customMessage : "username/password is wrong"
                    }
                }
            }
        })
        .catch (next)
    }
}

module.exports = UserController