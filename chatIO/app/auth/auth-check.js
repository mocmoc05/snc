const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const User = require("../models/user");
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    //console.log(decoded);
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }
    const userId = decoded.data;

    User.findById(userId, function (err, dt) {
      if (err) {
        return res.status(401).end();
      }
      return next();
    })
  });
};