const express = require('express');
const thoughtsService = require('./thoughtsService');
const requireToken = require('../middleware/requireToken');
const { checkThoughtExists, checkContent, checkUserId } = require('./thoughtsHelper');

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
  .post(bodyParser, requireToken, checkContent, (req, res) => {
    const { content } = req.body;
    const db = req.app.get('db');

    const thoughtObject = {
      user_id: res.userId,
      content,
    };

    return thoughtsService
      .createThought(db, thoughtObject)
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
  .all(checkThoughtExists)
  .get((req, res) => res.json(res.thought))
  .patch(bodyParser, requireToken, checkUserId, checkContent, (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const db = req.app.get('db');

    return thoughtsService
      .updateThought(db, id, content)
      .then((updatedThought) => res.status(200).json(updatedThought));
  })
  .delete(bodyParser, requireToken, checkUserId, (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');

    return thoughtsService
      .deleteThought(db, id)
      .then(() => res.status(204).end());
  });

module.exports = thoughtsRouter;
