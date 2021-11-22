var io = require('socket.io');
const http = require("http").Server(app);
var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000' 
}));


http.listen(3000, function() {
    console.log("listening on *:3000");
  });