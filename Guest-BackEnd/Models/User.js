const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Department', 'Office', 'Mess','Student'], // Add all allowed roles here
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
