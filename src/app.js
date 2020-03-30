require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CORS_ORIGIN } = require('../config');

const thoughtsRouter = require('./thoughts/thoughtsRouter');
const tokenRouter = require('./token/tokenRouter');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test',
}));
app.use(helmet());
app.use(cors({
  origin: CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.status(200).end();
});

app.use('/thoughts', thoughtsRouter);
app.use('/token', tokenRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = {
      error: {
        message: 'server error',
      },
    };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).send(response);
});

module.exports = app;
