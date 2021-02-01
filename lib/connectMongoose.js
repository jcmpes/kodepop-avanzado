'use strict'

const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', err => {
    console.log('Error de conexion con MongoDB', err);
    process.exit(1);
});

db.once('open', () => {
    console.log('Conectado a MongoDB:', db.name)
});

mongoose.connect('mongodb://localhost/keepads', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = db;