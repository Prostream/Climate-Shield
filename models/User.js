const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phoneNumber: String
});

module.exports = mongoose.model('User', userSchema);