const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const {
    hashPassword
} = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: [true, `Email has been registered`],
        validate: {
            validator: function (value) {
                let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(value)
            },
            message: `Email format is not a valid!`
        }
    },
    password: String
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)
module.exports = User