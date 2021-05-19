const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mobileNo: Number,
    hash: String,
    salt: String
});

module.exports = mongoose.model('donorCredentials', UserSchema);