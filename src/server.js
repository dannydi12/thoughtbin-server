const http = require('http');
const { Server } = require('ws');
const knex = require('knex');
const app = require('./app');
const { PORT, WS_PORT, DATABASE_URL } = require('../config');

// create knex instance
const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);

// create web socket instance
const socketServer = http.createServer(app);
const wss = new Server({ server: app });

wss.on('connection', (socket) => {
  // socket.send('hey');
});

app.set('websocket', wss);

// servers eagerly listening
// wss.listen(WS_PORT, () => {
//   console.log(`Socket is up at ws://localhost:${WS_PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
