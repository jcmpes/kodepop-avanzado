'use strict'

// Servicio de generacion de thumbnails
const sharp = require('sharp');
const cote = require('cote');

// Declarar el microservicio
const responder = new cote.Responder({
    name: 'i-resize-u'
})

// Logica del microservicio
responder.on('resize', (req, done) => {
    const originalImage = `../public/images/${req.img}`;
    sharp(originalImage)
        .resize({ width: 100, height: 100 })
        .toFile(`../public/images/thumb-${req.img}`)
    console.log('generated thumbnail ', req.img)
    done(`images/thumb-${req.img}`)
})