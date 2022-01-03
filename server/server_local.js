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
const rooms = {};

instrument(io, { auth: false }) //TODO: Add Authentication before deployment JKr 011221
// Connect to https://admin.socket.io/#/
// Client https://amritb.github.io/socketio-client-tool

io.on('connection', socket => {
    console.log('connection made successfully');

    socket.on('roomID', (room) => {
        room(roomID);
        //console.log("RoomID (" + roomID + ") was trasnmitted to the client");

    });

    socket.on('join-room', (roomID) => {        //auf UserID umstellen, weil Raumid (uuid) immer dieselbe ist
        
        if (rooms[roomID] && rooms[roomID].includes(socket.id) == false) {
            rooms[roomID].push(socket.id);

        } else if (rooms[roomID] && rooms[roomID].includes(socket.id) == true) {
            //falls socket.id schon in dem Array enthalten ist soll nichts gemacht werden, da mit dem elese Fall sonst altes Array überschrieben werden würde

        } else {
            rooms[roomID] = [socket.id];
        }

        var otherUser = rooms[roomID][rooms[roomID].length - 1];        //bestimmt aus dem Array rooms den letzten gejoined user
       
        if (otherUser != rooms[roomID][0]) {
            io.emit("other user", otherUser);       //gibt an alle aus das ein neuer User oder er gejoined ist
        }
    });

    // socket.on('disconnect', (e) => {
    //     console.log('User disconnected: ',e);
    // });

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
        console.log('User disconnected: ', e);
        //delete users[socket.id];
        socket.disconnect();
    });


})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})


