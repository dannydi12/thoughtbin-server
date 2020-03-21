const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { JWT_SECRET } = require('../../config');

module.exports = {
  createJwt() {
    return jwt.sign(
      { userId: uuid.v4() },
      JWT_SECRET,
      { algorithm: 'HS256' },
    );
  },
};
