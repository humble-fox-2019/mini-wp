const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generatePassword } = require('../helpers/bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, `Username can not be empty`]
    },
    img: {
        type: String,
        required: [true, `Profile picture cannot be empty`]
    },
    email: {
        type: String,
        required: [true, `Email can not be empty`],
        validate: [{
            validator: function emailFormat(email) {
                let checkFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return checkFormat.test(email);
            },
            message: props => `props is a invalid email format`
        }, {
            validator: function emailUnique(email) {
                return User.findOne({ email: this.email })
                    .then(function (user) {
                        if (user) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .catch(function (err) {
                        return false;
                    })
            },
            message: props => `Email ${props.value} already registered by another user`
        }]
    },
    password: {
        type: String,
        required: [true, `Password cannot be empty`]
    }
}, {
        timestamps: true,
        versionKey: false
    });

UserSchema.pre('save', function (next) {
    this.password = generatePassword(this.password);
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;