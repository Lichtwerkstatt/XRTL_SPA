var Gpio = require('onoff').Gpio;
var green = new Gpio(16, 'out');
var blue = new Gpio(20, 'out');
var red = new Gpio(21, 'out');
var b = 0;

var blinkInterval;
const app = require('express')()
const server = require('http').createServer(app)
const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const roomID = uuidv4();
const users = {};
var componentID = '';
const socketToRoom = {};

instrument(io, { auth: false }) //TODO: Add Authentication before deployment JKr 011221
// Connect to https://admin.socket.io/#/
// Client https://amritb.github.io/socketio-client-tool

function RGB(r, g, b) {
    red.writeSync(r);
    green.writeSync(g);
    blue.writeSync(b);
}

function clients_connected() {
    if (io.engine.clientsCount == 0) {
        RGB(1, 0, 0);
    } else {
        RGB(0, 1, 0);
    }
}

function blink_start() {
    if (b == 0) {
        RGB(0, 0, 1);
        b = 1;
    } else {
        RGB(0, 0, 0);
        b = 0;
    }
}
function blink_end() {
    clearInterval(blinkInterval);
    clients_connected();
}

function blink() {
    blinkInterval = setInterval(blink_start, 250);
    blink_start();
    setTimeout(blink_end, 1000);
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function sleep(time) {
    await Sleep(time);
}

clients_connected();

io.on('connection', socket => {
    console.log('connection made successfully');
    RGB(0, 1, 0);

    //The handshakes of the VIDEO CHAT

    //Sends the random generated roomID to the client how wants to join the video chat
    socket.once('roomID', (room) => {
        room(roomID);
        //console.log("RoomID (" + roomID + ") was trasnmitted to the client");
    });

    //Sends an array with all the users in the room except the client how sends this command
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

    //Sends the peer to the newly joined client
    socket.on("sending signal", payload => {
        console.log("Sending a signal");
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    //Sends the peer to the already connected clients
    socket.on("returning signal", payload => {
        console.log("Returing a signal");
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    //Handshake to handle the CHAT MESSAGES

    //Sends the new message to all users
    socket.on('message', payload => {
        blink();
        console.log('Message received on server: ', payload);
        io.emit('message', payload);
    })

    //Handshakes for the experiment cameras


    //Client how starts the stream is added to a room
    socket.on('join stream room', getComponentID => {
        componentID = getComponentID;
        console.log("Start stream of " + componentID);
        socket.join(componentID);
        let roomSize = io.sockets.adapter.rooms.get(componentID).size;
        //console.log(roomSize);

        if (roomSize == 1) {
            io.emit("command", {
                userId: "user123",
                componentId: componentID,
                command: "startStreaming",
            });
        }
    });

    //Sends pictures of the stream to the clients
    socket.on('pic', (data) => {
        socket.to(componentID).emit('pic', { buffer: data.image });
    });

    //Clients leaves the room after ending the stream
    socket.on('leave stream room', getComponentID => {
        console.log("End stream of " + getComponentID);
        let roomSize = io.sockets.adapter.rooms.get(componentID).size - 1;
        //console.log(roomSize);

        if (roomSize == 0) {
            io.emit("command", {
                userId: "user123",
                componentId: componentID,
                command: "stopStreaming",
            });
        }
        socket.leave(getComponentID);
    });

    socket.on("error", (error) => {
        blink();
        console.error("Socket.io error observed: ", error);
    });

    //Handshakes for command handeling

    //Transfers the command from the client to the experiment components
    socket.on('command', payload => {
        blink();
        console.log("Command received:", payload);
        io.emit('command', payload);
    })

    //Returns theb status of a experiment component
    socket.on('status', payload => {
        console.log("New Status", payload)
        io.emit('status', payload)
    });

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e);
        clients_connected();
    })

    socket.on('disconnect', (e) => {
        blink();

        if (typeof socketToRoom[socket.id] !== 'undefined') {
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
            console.log(users[roomID]);
        }
        socket.disconnect();
        console.log('User disconnected: ', e);
        clients_connected();
    });

})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})