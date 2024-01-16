const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    isEmpty: { type: Boolean, default: true }
  }


}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);