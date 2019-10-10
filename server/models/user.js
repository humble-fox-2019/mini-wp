const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

/* username : req.body,username,
            gender : req.body.gender,
            location : req.body.location,
            age : req.body.age,
            profession : req.body.profession,
            appearance : req.body.appearance,
            interests : req.body.interests, */
const userSchema = new Schema({
    username : {
        type : String,
        required : [true,'username is required']
    },
    location : {
        type : String,
        required : [true,'your general location is required']
    },
    age : {
        type : String,
        required : [true,'tell us your age range at least']
    },
    profession : {
        type : String,
        required : [true,'tell us about your job']
    },
    appearance : {
        type : String,
        required : [true,'tell us what you look like']
    },
    interests : {
        type : String,
        required : [true,'tell us what you love to do']
    },
    avatar : {
        type : String,
        required : [true,'upload your photo...maybe?']
    },
    banner : {
        type : String,
        required : [true,'post the banner for your blog!']
    },
    email : {
        type : String,
        required : [true,'your email is required for verification']
    },
    password : {
        type : String,
        required : [true,'set up a password to secure your account']
    }
})

userSchema.pre('save', function() {
    this.password = hashPassword(this.password)
})

let User = mongoose.model('User', userSchema)

module.exports = User
