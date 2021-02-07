var express = require('express');
var router = express.Router();

const Ad = require('../../models/Ad');

/**
 * Lista de agentes
 * GET /api/ads
 * 
 * Lista de agentes con paginación
 * GET /api/ads?skip=10&limit=10
 * 
 * Lista de anuncios con filtros:
 * -> tipo de anuncio (compra o venta)
 * GET /api/ads?type=Venta
 * 
 * -> tag
 * GET /api/ads?tag=Electronica
 * 
 * -> precio
 * GET /api/ads?price[$gte]=300&price[$lt]=400
 * 
 * Lista de anuncios ordenada:
 * GET /api/ads?sort=price
 * 
 */
router.get('/', async function(req, res, next) {
  try {
    const price = req.query.price;  
    const title = req.query.title;
    const tag = req.query.tag;
    const type = req.query.type;
    const filter = {};
    if (type) {
      filter.type = type;
    }
    if (tag) {
      filter.tags = tag;
    }
    if (title) {
      filter.title = new RegExp(title, "i");
    }
    if (price) {
      filter.price = price;
    }
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const result = await Ad.filterAndList(filter, limit, skip, sort);
    if(result[0] == null) {
      return res.status(404).json({ error: 'ads not found'});
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Detalle de anuncio
 * GET /api/ads/:id
 */
router.get('/:id', async(req, res, next) => {
  try {
    const _id = req.params.id;
    const ad = await Ad.findOne({ _id: _id });
    if(!ad) {
      res.status(404).json({ error: 'ad not found'});
      return;
    }
    res.json({ result: ad })
  } catch (err) {
    next(err);
  }
})


module.exports = router;