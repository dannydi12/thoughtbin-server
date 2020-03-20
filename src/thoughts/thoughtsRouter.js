const express = require('express');

const thoughtsRouter = express.Router();
const bodyParser = express.json();

thoughtsRouter
  .get('/', (req, res) => {
    // should allow a ?user=1 query to get user specific thoughts (check for identity)
    res.send('thoughts endpoint');
  })
  .post('/', bodyParser, (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { id, user, content } = req.body;
    req.app.get('websocket')
      .clients
      .forEach((client) => {
        client.send(content);
      });
    res.status(201).json(content);
  });

module.exports = thoughtsRouter;
