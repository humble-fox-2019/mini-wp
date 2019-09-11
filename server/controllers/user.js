const User = require('../models/user')
const { tokenGenerate } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')


class UserController{

    static findOne(req, res, next){
        
    }

    static register(req, res, next){
        const { name, email, password } = req.body
        User.create({
            name, password, email
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }

    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            email
        })
            .then(user => {
                let payload = {
                    id : user._id,
                    email : user.email
                }
                
                if(user && comparePassword(password, user.password)){
                   let token = tokenGenerate(payload)
                   res.status(201).json({
                       message : `Login Success`,
                       token
                   })
                } else {
                    next({
                        status : 400,
                        message : `Email/Password not valid`
                    })
                }
            })
            .catch(err => {
                next({
                    status : 400,
                    message : `Email/Password not valid`
                })
            })
    }

    static signin(req, res, next){

    }

    static update(req, res, next){

    }
        
    static changePassword(req, res, next){
        let password = req.body.password
        User.findOne({
            _id : req.params.id
        })
        .then(user => {
            if(!user) {
                next({
                    status : 204,
                    message : `User not found`
                })
            } else {
                user.password = password
                user.save()
            }
        })
        .catch(next)
    
    }

    static remove(req, res, next){

    }
}

module.exports = UserController