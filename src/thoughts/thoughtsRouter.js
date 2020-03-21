const express = require('express');
const xss = require('xss');
const thoughtsService = require('./thoughtsService');
const requireToken = require('../middleware/requireToken');
const {
  checkThoughtExists,
  checkContent,
  checkUserId,
  checkOffset,
} = require('./thoughtsHelper');

const thoughtsRouter = express.Router();
const bodyParser = express.json();

thoughtsRouter.route('/')
  .get(checkOffset, (req, res) => {
    const { userId, offset } = req.query;
    const db = req.app.get('db');

    if (userId) {
      return thoughtsService
        .getUserThoughts(db, userId, offset)
        .then((thoughts) => res.json(thoughts));
    }

    return thoughtsService
      .getAllThoughts(db, offset)
      .then((thoughts) => res.json(thoughts));
  })
  .post(bodyParser, requireToken, checkContent, (req, res) => {
    const { content } = req.body;
    const db = req.app.get('db');

    const thoughtObject = {
      user_id: res.userId,
      content: xss(content),
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
      .updateThought(db, id, xss(content))
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
