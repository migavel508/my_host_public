const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log('Message:', message);
    io.emit('message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3000;
const HOST = '0.0.0.0'; // Listen on all available network interfaces

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
