'use strict';

const mongoose = require('mongoose');
const bcript = require('bcrypt');

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});

userSchema.statics.hashPassword = password => {
    return bcrypt.hash(password, 9);
};

const User = mongoose.model('User', userSchema);

module.exports = User;