const app = require('express')();
const server = require('http').createServer(app)
//const { instrument } = require('@socket.io/admin-ui');
const { log } = require('console');
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const roomID = uuidv4();
const users = {};
const socketToRoom = {};
var lastUserID = '';

//instrument(io, { auth: false }) //TODO: Add Authentication before deployment JKr 011221
// Connect to https://admin.socket.io/#/
// Client https://amritb.github.io/socketio-client-tool

io.on('connection', socket => {
    console.log('connection made successfully');

    //Following are for handshakes for the video chat
    socket.once('roomID', (room) => {
        room(roomID);
        //console.log("RoomID (" + roomID + ") was trasnmitted to the client");
    });

    socket.on("client join room", roomID => {
        if (users[roomID]) {
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("Client list", roomID => {
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("Client list", usersInThisRoom);
    })

    socket.on("sending signal", payload => {
        console.log("Sending a signal");
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        console.log("Returing a signal");
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e)
    });

    //Handshake to handle the chat messages
    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        io.emit('message', payload)
    });

    socket.on('pic', (data) => {
        socket.broadcast.emit('pic', { buffer: data.image });
    });

    //Handshakes for the experiment cameras
    socket.on("camera", (data => {
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.broadcast("camera", data);
    }));

    socket.on("error", (error) => {
        console.error("Socket.io error observed: ", error);
    });

    //kann das weg?
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
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        console.log(users[roomID]);
        socket.disconnect();
        console.log('User disconnected: ', e);

    });
})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})