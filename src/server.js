const http = require('http');
const ws = require('ws');
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
const websocket = new ws.Server({ server: socketServer });

websocket.on('connection', (socket) => {
  // socket.send('hey');
});

app.set('websocket', websocket);

// servers eagerly listening
socketServer.listen(WS_PORT, () => {
  console.log(`Socket is up at http://localhost:${WS_PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
