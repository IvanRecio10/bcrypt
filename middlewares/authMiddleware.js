const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    
    req.user = user; 
    next();
  });
}

module.exports = authenticateToken;
