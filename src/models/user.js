const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: {
    type: String,
    required: true,
    unique: true // ✅ Prevent duplicate emails
  },
  password: String,
  age: Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;
