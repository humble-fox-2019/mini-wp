const mongoose = require('mongoose');
const { hash } = require('../helpers/bcrypt');
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

userSchema.pre('save' , function( next ) {
    this.password = hash( this.password );
    next();
})

const user = mongoose.model( 'User' , userSchema );
module.exports = user;