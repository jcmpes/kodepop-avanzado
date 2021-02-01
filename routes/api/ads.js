var express = require('express');
var router = express.Router();

const Ad = require('../../models/Ad');

/**
 * GET /api/ads
 * Lista de agentes
 */
router.get('/', async function(req, res, next) {
    try {
        const result = await Ad.find();
        res.json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;