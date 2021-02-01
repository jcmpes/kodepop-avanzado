'use strict'

const mongoose = require('mongoose');
const db = mongoose.connection;

// Open a connection to the db
mongoose.connect('mongodb://localhost/keepads', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get notified if we connect succesfully
db.once('open', () => {
    console.log('Conectado a MongoDB:', db.name)
});

// or if a connection error occurs
db.on('error', err => {
    console.log('Error de conexion con MongoDB', err);
    process.exit(1);
});

module.exports = db;