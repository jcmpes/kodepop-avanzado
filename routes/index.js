var express = require('express');
var router = express.Router();

const Ad = require('../models/Ad')

/* GET home page. */
router.get('/', async function(req, res, next) {
  await Ad.find((err, result) => {
    if(err) {
      next(err);
      return 
    }
    res.render('index', { title: 'Keepads', ads: result });

  })
});

module.exports = router;
