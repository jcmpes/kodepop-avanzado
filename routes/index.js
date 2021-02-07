const express = require('express');
const router = express.Router();

const MAX_PRICE = 1000000;

const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async function(req, res, next) {
  await Ad.find((err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.render('index', {title: 'Keepads', ads: result});
  });
});

/**
 * GET ads filtered by price in the ejs view
 * GET /filters?lt=100&gt=40
 */
router.get('/filters', async function(req, res, next) {
  const max = req.query.lt;
  const min = req.query.gt;
  const type = req.query.type;

  await Ad
      .find({
          price: {$lt: max || MAX_PRICE, $gt: min || 0},
          type: type || "Venta",
      })
      .then((result) => {
        res.render('index', {title: 'Keepads', ads: result});
      })
      .catch((err) => {
        next(err);
      });
});

module.exports = router;
