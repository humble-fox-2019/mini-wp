const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    minlength: [3, 'Username minimal 3'],
    maxlength: [20, 'Username maximal 20']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid format']
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password minimal 6']
  }
})

userSchema.path('email').validate(function(value) {

  return User.findOne({ email: value })
    .then(user => {
      if(user) {
        return false
      }
    })

}, 'Emaill already registered')

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
