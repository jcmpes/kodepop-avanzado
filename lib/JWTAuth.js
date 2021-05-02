'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();
 
const JWTAuth = (req, res, next) => {
  /**
  * JWT Auth
  */

  // Buscar token en el header de la peticion, el body o en query string
  const jwtToken = req.get('Authorization') || req.body.token || req.query.token;
  if(!jwtToken) {
    const error = new Error('Invalid token');
    error.status = 401;
    next(error);
    return;
  };

  // Comprobar si el token es valido
  jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET, (err, payload) => {
    if(err) {
      next(err);
      return;
    }
    req.apiAuthUserId = payload._id;
    next();
  })
};

module.exports = JWTAuth;
  