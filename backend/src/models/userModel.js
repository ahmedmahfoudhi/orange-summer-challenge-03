const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    address: {
        type: String,
    },
    isAdmin : {
        type: Boolean,

    }
  }
)

module.exports = mongoose.model('User', userSchema)