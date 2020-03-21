const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

function requireToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(
    token,
    JWT_SECRET,
    { algorithm: ['HS256'] },
    (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token');
      }
      if (req.body.userId !== decoded.userId) {
        return res.status(401).send('You can\'t modify others\' thoughts...');
      }
      res.userId = decoded.userId;
      return next();
    },
  );
}

module.exports = requireToken;
