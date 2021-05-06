const mongoose = require('mongoose');
const config = require('./config.json');
const host = config.mongodb.host;
const dbname = config.mongodb.name;

// Import the models
const Ad = require('../models/Ad');
const Tag = require('../models/Tag');
const User = require('../models/User');

// Create sample data
const newAds = [
  {
    title: 'Amplificador',
    description:
      'Vendo este fantástico amplificador vintage de 30w por canal a 8Ω',
    price: 100,
    type: 'Venta',
    img: '/images/thumb-amp.jpg',
    tags: ['Electronica', 'Imagen y sonido'],
  }, {
    title: 'Ratón inalámbrico',
    description: 'Apple magic mouse 2 usado en perfectas condiciones',
    price: 50,
    type: 'Venta',
    img: '/images/thumb-mouse.jpg',
    tags: ['Electronica', 'Ordenadores'],
  }, {
    title:
      'Mesa de terraza con 4 sillas',
    description:
    'Maravilloso mueble cervecero con respaldo de tectake que le dará un encanto especial a su jardín. Banco y mesa fabricados en madera resistente y entusiasmar con su óptica natural y elegante. Aspecto a destacar: Al contrario de otros muebles cerveceros este en particular tiene un respaldo espectacular. De manera que ofrece mucho más confort y comodidad cuando uno celebra. Llévese hoy a casa este mueble cervecero tan resistente con respaldo de tectake.',
    price: 125,
    type: 'Venta',
    img: '/images/thumb-mesa.jpg',
    tags: ['Muebles', 'Jardin'],
  }, {
    title: 'iPhone X 256GB',
    description: 'Busco iPhoneX de 256GB libre.',
    price: 350,
    type: 'Compra',
    img: '/images/thumb-iPhone.jpeg',
    tags: ['Electronica', 'Moviles'],
  },
];

const newTags = [
  { tag: 'Electronica' },
  { tag: 'Ordenadores' },
  { tag: 'Moviles' },
  { tag: 'Muebles' },
  { tag: 'Jardin' },
];

async function initDatabase() {
  try {
    mongoose.connect(`mongodb://${host}/${dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    // Clear the db everytime
    await mongoose.connection.dropCollection(
        'ads',
        function() {
          console.log('Collection dropped');
        },
    );

    await mongoose.connection.dropCollection(
      'tags',
      function() {
        console.log('Collection dropped');
      },
    );
    
    await mongoose.connection.dropCollection(
      'users',
      function() {
        console.log('Collection dropped');
        },
    );

    /**
     * Adds sample tags.
     * @param {Array} newTags.
     * @returns {Promise} 
     */
    Tag.create(newTags).then((result) => {
      console.log('Added', result);
    }).catch((err) => {
      console.log('Error adding data', err);
    });
    
    Ad.create(newAds).then((result) => {
      console.log('Added', result);
    }).catch((err) => {
      console.log('Error adding data', err);
    });
    
    User.create({ 
      email: 'user@example.com',
      password: await User.hashPassword('1234')
    }).then((result) => {
      console.log('Added', result);
      console.log('Your database has been initializad gracefully');
      process.exit(0);
    }).catch(err => {
      console.log('Error adding user sample data', err)
    });
  } catch (err) {
    console.log('Error initializing database', err);
  }
}

initDatabase();
