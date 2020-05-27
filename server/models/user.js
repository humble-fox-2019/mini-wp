const mongoose = require("mongoose");
const bcrypt = require("../helpers/bcrypt.js");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"]
    },
    email: {
      type: String,
      validate: [
        {
          validator: function(val) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              val
            );
          },
          message: props => `${props.value} is not a valid email`
        },
        {
          validator: function(val) {
            return mongoose
              .model("User", userSchema)
              .find({
                _id: {
                  $ne: this._id
                },
                email: val
              })
              .then(data => {
                if (data.length !== 0) {
                  return false;
                }
              })
              .catch(err => {
                return err.message;
              });
          },
          message: "email already exist"
        }
      ],
      required: [true, "email is required"]
    },
    password: {
      type: String,
      required: [true, "password is required"]
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  this.email = this.email.toLowerCase();
  this.password = bcrypt.hash(this.password);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;