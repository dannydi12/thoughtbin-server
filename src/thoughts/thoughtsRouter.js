const express = require('express');
const thoughtsRouter = express.Router();

const bodyParser = express.json()

thoughtsRouter
  .get('/', (req, res) => {
    res.send('thoughts endpoint')
  })

module.exports = thoughtsRouter;