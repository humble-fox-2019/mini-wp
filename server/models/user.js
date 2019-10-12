const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { bcrypt } = require('../helpers')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        validate: [
            {
                validator: function (val) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
                },
                message: 'Invalid Email'
            },
            {
                validator: function (val) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: val
                    })
                        .then(data => {
                            if (data.length !== 0) {
                                return false
                            }
                        })
                        .catch(err => {
                            return err.message
                        })
                },
                message: 'Email has been used'
            }
        ],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        validate: {
            validator: function (val) {
                return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(val)
            },
            message: 'Password must contain at least one letter, one number, and minimum six characters'
        },
        required: [true, 'Password is required']
    },
    image: {
        type: String,
        default: null
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
}, {
    timestamps: true
})


userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase()
    this.password = bcrypt.generateHash(this.password)
    next()
})

userSchema.post('findOneAndUpdate', function (user, next) {
    user.email = user.email.toLowerCase()
    user.password = user.password

    return user.save({ runValidators: true })
})

const User = mongoose.model('User', userSchema)

module.exports = User