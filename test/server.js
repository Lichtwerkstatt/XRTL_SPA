const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})
const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  socket.on('pic', (image) => {
       socket.emit('pic', (image));

  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});