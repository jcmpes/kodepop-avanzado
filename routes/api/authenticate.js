const express = require('express');
const router = express.Router(); 
const apiAuthController = require('../../controllers/apiAuthController')

/**
 * POST /api/authenticate
 */
router.post('/',  async (req, res, next) => {
    apiAuthController(req, res, next);
})
module.exports = router;