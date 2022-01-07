const users = {};
const socketToRoom = {};
const app = require('express')();
const server = require('http').createServer(app)
const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const { v4: uuidv4 } = require('uuid');
const roomID = uuidv4();
const user = {};
var lastUserID = '';

instrument(io, { auth: false }) //TODO: Add Authentication before deployment JKr 011221
// Connect to https://admin.socket.io/#/
// Client https://amritb.github.io/socketio-client-tool

io.on('connection', socket => {
    console.log('connection made successfully');

    socket.once('roomID', (room) => {
        room(roomID);
        //console.log("RoomID (" + roomID + ") was trasnmitted to the client");

    });

    socket.once('client list', (data) => {        //übergibt an Client die Liste aller verbundenen Clients
        if (user[roomID] && user[roomID].includes(socket.id) == false) {
            user[roomID].push(socket.id);
        } else {
            user[roomID] = [socket.id];
        }
        console.log(user[roomID])
        data(user[roomID]);
        lastUserID = user[roomID][user[roomID].length - 1];        //bestimmt aus dem Array user den letzten gejoined user

        if (user[roomID] && lastUserID != user[roomID][0]) {    //Wenn eine zweite, dritte, ... Person joined, wird die aktulaisierte Liste an alle gesendet
            io.broadcast.emit("user joined", ({ id: lastUserID, list: user[roomID] }));
            return;     //damit if Bedingung verlassen wird
        }
    });



    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e)
    });

    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        io.broadcast.emit('message', payload)
    });

    socket.on('Experiment', (experiment) => {
        console.log('Experiment ausgewählt: ', experiment)
    });

    socket.on('command', payload => {
        console.log("Command received:", payload)
        io.emit('command', payload)
    });

    socket.on('status', payload => {
        console.log("New Status", payload)
        io.emit('status', payload)
    });

    socket.on('disconnect', (e) => {
        user[roomID] = user[roomID].filter(id => id !== socket.id);
        socket.disconnect();
        console.log('User disconnected: ', e);
    });
})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})


