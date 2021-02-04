var express = require('express');
var router = express.Router();

const Ad = require('../../models/Ad');

/**
 * Lista de agentes
 * GET /api/ads
 * 
 * Lista de agentes con paginación
 * GET /api/ads?skip=10&limit=10
 */
router.get('/', async function(req, res, next) {
    try {
        const filter = {};
        if (type) {
            filter.type = type;
        }
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const result = await Ad.filterAndList(filter, limit, skip);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

/**
 * 
 */

module.exports = router;