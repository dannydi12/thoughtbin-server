const express = require('express');
const thoughtsService = require('./thoughtsService');

const thoughtsRouter = express.Router();
const bodyParser = express.json();

thoughtsRouter
  .get('/', (req, res) => {
    const db = req.app.get('db');

    return thoughtsService.getAllThoughts(db)
      .then((thoughts) => {
        res.json(thoughts);
      });
  })
  .post('/', bodyParser, (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { id, userId, content } = req.body;
    req.app.get('websocket')
      .clients
      .forEach((client) => {
        client.send(content);
      });
    res.status(201).json(content);
  });

module.exports = thoughtsRouter;
