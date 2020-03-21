const express = require('express');
const tokenService = require('./tokenService');

const bodyParser = express.json();
const tokenRouter = express.Router();

tokenRouter.route('/')
  .get((req, res) => {
    res.json({ token: tokenService.createJwt() });
  });

module.exports = tokenRouter;
