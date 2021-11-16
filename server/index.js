const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const server = app.listen('3002', () => {
    console.log('LÄUFT');
});

io = socket(server);      //Verbindung zu Server

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join_Experiment_1', () => {       //in der Klammer könnten wir noch Daten übertragen
        socket.join();       //Übergabe an ?
        console.log('Experiment 1 was selected');
    });

    socket.on('disconnect', () => {
        console.log('User disconnted');
    });
});