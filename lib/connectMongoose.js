'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/keepads', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection();