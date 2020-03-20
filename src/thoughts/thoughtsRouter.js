const express = require('express');
const thoughtsService = require('./thoughtsService');

const thoughtsRouter = express.Router();
const bodyParser = express.json();

thoughtsRouter.route('/')
  .get((req, res) => {
    const db = req.app.get('db');

    return thoughtsService.getAllThoughts(db)
      .then((thoughts) => {
        res.json(thoughts);
      });
  })
  .post(bodyParser, (req, res) => {
    const { userId, content } = req.body;
    const db = req.app.get('db');

    const thoughtObject = {
      user_id: userId,
      content,
    };

    return thoughtsService.createThought(db, thoughtObject)
      .then((thought) => {
        req.app.get('websocket')
          .clients
          .forEach((client) => {
            client.send(JSON.stringify(thought));
          });
        return res.status(201).json(thought);
      });
  });

thoughtsRouter.route('/:id')
  .patch(bodyParser, (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const db = req.app.get('db');

    return thoughtsService.updateThought(db, id, content)
      .then((updatedThought) => res.status(200).json(updatedThought));
  });

module.exports = thoughtsRouter;
