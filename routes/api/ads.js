require('dotenv');

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const JWTAuth = require('../../lib/JWTAuth');
const multer = require('multer');
const cote = require('cote');
const path = require('path');

const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "public/images/";
const PLACEHOLDER_IMAGE = process.env.PLACEHOLDER_IMAGE || "http://placehold.jp/100x100.png";
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
const fileExtensionRemover = originalName => {
  return originalName.split('.')[0];
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function(req,file, cb) {
    cb(null, fileExtensionRemover(file.originalname) + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage })

/** 
 * Crear un anuncio (body)
 * POST /api/ads
 * El middleware de upload hace que multer guarde
 * la imagen en el sistema de ficheros
 */
router.post('/', upload.single('img'), async (req, res, next) => {
  const adData = req.body
  const image = req.file
  const ad = new Ad(adData);
  
  // Enviar ruta de la imagen por cote a i-resize-u
  const requester = new cote.Requester({ name: "gimme-thumbnail", timeout: 6000 });
  const request = { type: 'resize', img: image.filename };
  const response = await requester.send(request);
  // console.log('response:', response)
  ad.img = response;
  const newAd = await ad.save();
  res.status(201).json({ result: newAd });

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