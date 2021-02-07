var express = require('express');
var router = express.Router();

const Ad = require('../../models/Ad');

/**
 * List all tags
 * GET /api/tags
 */

router.get('/', async function(req, res, next) {
    try {
    // I have created a Tag model but decided to show the tags
    // populating an array from the currently existing ads's tags
    // const Tag = require('../../models/Tag')
    // const tags = await Tag.find()
    const ads = await Ad.find();
    let tags = [];
    for(let ad of ads) {
        ad.tags.forEach(tag => tags.includes(tag) ? null : tags.push(tag))
    }
    res.json(tags);
    } catch (err) {
        return next(err);
    }
})

module.exports = router;