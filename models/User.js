'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

userSchema.statics.hashPassword = function(pass) {
  return bcrypt.hash(pass, 9);
};

userSchema.methods.comparePassword = function(pass) {
  return bcrypt.compare(pass, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
