const app = require('./app');
const http = require('http');
const ws = require('ws')
const { PORT, WS_PORT } = require('../config');

const socketServer = http.createServer(app);
const websocket = new ws.Server({ server: socketServer });

websocket.on('connection', (socket) => {
  socket.send('hey')
})

app.set('websocket', websocket);

socketServer.listen(WS_PORT, () => {
  console.log(`Socket is up at http://localhost:${WS_PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});