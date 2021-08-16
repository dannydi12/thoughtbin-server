const http = require('http');
const { Server } = require('ws');
const { parse } = require('pg-connection-string');
const knex = require('knex');
const app = require('./app');
const { PORT, DATABASE_URL } = require('../config');

const pgconfig = parse(DATABASE_URL);
pgconfig.ssl = { rejectUnauthorized: false };

// create knex instance
const db = knex({
  client: 'pg',
  connection: pgconfig,
});

app.set('db', db);

// create web socket instance
const server = http.createServer(app);
const wss = new Server({ server });

app.set('websocket', wss);

// server eagerly listening
server.listen(PORT, () => {
  console.log(`HTTP server is up at http://localhost:${PORT}`);
});
