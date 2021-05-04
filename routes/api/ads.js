var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const JWTAuth = require('../../lib/JWTAuth');
const multer = require('multer');
const cote = require('cote');

/**
 * Lista de anuncios con opciones de filtrado
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
router.get('/', JWTAuth, async function(req, res, next) {
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
      res.status(404).json({error: 'ad not found'});
      return;
    }
    res.json({ result: ad })
  } catch (err) {
    next(err);
  }
})

/**
 * Configurar multer
 */
const upload = multer({
  dest: "public/images/"
})

/** 
 * Crear un anuncio (body)
 * POST /api/ads
 */
router.post('/', upload.single('img'), async (req, res, next) => {
    try {
        const adData = req.body
        const image = req.file
        const ad = new Ad(adData);
        // Agreagar la ruta de la imagen al objeto ad
        if (image) {
          ad.img = '/images/' + image.filename
        }
        
        // Enviar ruta de la imagen por cote a i-resize-u
        const requester = new cote.Requester({ name: "gimme-thumbnail" });
        const request = { type: 'resize', img: image.filename }
        console.log('request', request)
        requester.send(request, async routeToThumb => {
          console.log('thumbnail route:', routeToThumb)
          ad.img = routeToThumb;
          const newAd = await ad.save();
          res.status(201).json({ result: newAd });
          return
        })
        

    } catch (err) {
        next(err)
    }
})

/**
 * Eliminar un anuncio
 * DELETE /api/agentes:id
 */
router.delete('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;

        await Ad.deleteOne({ _id: _id });

        res.json();
    } catch (err) {
        next(err)
    }
})

/**
 * Subida de imagen
 */


module.exports = router;