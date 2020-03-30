const express = require('express');
const tokenService = require('./tokenService');

const tokenRouter = express.Router();

tokenRouter.route('/')
  .post((req, res) => {
    res.status(201).json({ token: tokenService.createJwt() });
  });

module.exports = tokenRouter;
