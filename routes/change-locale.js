var express = require('express');
var router = express.Router();

/**
*   GET /change-locale/:locale
*/
router.get('/:locale', (req, res, next) => {
    const locale = req.params.locale;

    // Poner una cookie en el browser con el idioma elegido
    res.cookie('keepads-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 2
    })

    // Y despues redirigir a la pagina de donde venia (referer header)
    res.redirect(req.get('referer'));
});

module.exports = router;