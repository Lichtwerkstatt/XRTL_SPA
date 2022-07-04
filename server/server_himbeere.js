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
var userIDs = [];
var userIDServerList = [];
var componentList = [];
var componentID = '';
var footerList = [];
const socketToRoom = {};
var GUIId = ""

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
    socket.emit("newLog", 'Connection made successfully')
    RGB(0, 1, 0);

    socket.on('GUI', () => {
        GUIId = socket.id
    })

    socket.on('newLogGUI', (payload) => {
        socket.emit("newLog", payload)
    })

    socket.on("userId", (newUser) => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (userIDServerList) {
            userIDServerList.push(socket.id, time, newUser)
        } else {
            userIDServerList = [socket.id, time, newUser]
        }
        userIDs = [socket.id, time, newUser]
        socket.broadcast.emit("newUser", (time, userIDs))
        socket.to(GUIId).emit("newLog", 'User connected successfully')
    })

    socket.on("updateUser", () => {
        socket.emit("updateUser", userIDServerList)
    })

    socket.on("updateUserList", (newList) => {
        userIDServerList = newList
    })

    socket.on("updateComponents", () => {
        socket.emit("updateComponents", componentList)
    })

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
        //console.log("Sending a signal");
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    //Sends the peer to the already connected clients
    socket.on("returning signal", payload => {
        //console.log("Returing a signal");
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    //Handshake to handle the CHAT MESSAGES

    //Sends the new message to all users
    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        socket.to(GUIId).emit("newLog", 'Message received on server: ' + JSON.stringify(payload))
        io.emit('message', payload)
    });

    //Handshakes for the experiment cameras

    //Client how starts the stream is added to a room
    socket.on('join stream room', (data) => {
        componentID = data.id;
        console.log("User has joined the room " + componentID);
        socket.to(GUIId).emit("newLog", "User has joined the room " + String(componentID));
        socket.join(componentID);
        let roomSize = io.sockets.adapter.rooms.get(componentID).size;
        //console.log(roomSize);

        if (roomSize == 1) {
            io.emit("command", {
                userId: data.username,
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
    socket.on('leave stream room', (data) => {
        console.log("User has left the room " + data.id);
        socket.to(GUIId).emit("newLog", "User has left the room " + String(data.id));
        try {
            let roomSize = io.sockets.adapter.rooms.get(data.id).size - 1;
        } catch (error) {
            var roomSize = 0
        }
        //console.log(roomSize);

        if (roomSize == 0) {
            io.emit("command", {
                userId: data.username,
                componentId: data.id,
                command: "stopStreaming",
            });
        }
        socket.leave(data.id);
    });

    /*     socket.on("error", (error) => {
            console.error("Socket.io error observed: ", error);
            socket.to(GUIId).emit("newLog", "Socket.io error observed: "+ String(error));
        }); */

    //Handshakes for command handeling

    //Transfers the command from the client to the experiment components
    socket.on('command', payload => {
        blink();
        console.log("Command received: ", payload);
        socket.to(GUIId).emit("newLog", "Command received: " + JSON.stringify(payload));
        socket.broadcast.emit('command', payload);
    });

    //Returns the status of a experiment component
    socket.on('status', payload => {
        console.log("New Status", payload)
        console.log("Componenten Busy Status")
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        if (componentList.includes(socket.id) === false) {
            componentList.push(socket.id, time, payload.componentId, payload.status.busy);
        }
        else if (componentList.includes(socket.id) === true) {

        } else {
            componentList = [socket.id, time, payload.componentId, payload.status.busy];
        }
        console.log("Conmponenten Liste")
        console.log(componentList)
        socket.to(GUIId).emit("newLog", "New Status" + JSON.stringify(payload));
        socket.to(GUIId).emit("newComponent", componentList);
        socket.broadcast.emit('status', payload);
    });


    socket.on('footer', payload => {
        console.log(footerList)
        if (footerList.includes(payload.componentId) === false) {
            footerList.push(payload.componentId, payload.status)
        } else if (footerList.includes(payload.componentId) === true) {
            var newStatus = footerList.indexOf(payload.componentId)
            footerList[newStatus + 1] = payload.status
        }

        io.emit('footer', payload)
    })

    socket.on('getFooter', payload => {
        if (footerList.includes(payload) === true) {
            var statusFoot = footerList.indexOf(payload);
            console.log(footerList)
            console.log(payload)
            io.emit('getFooter', { componentId: payload, status: footerList[statusFoot + 1] })
        }
    })

    socket.on('error', (er) => {
        console.log("Error " + er.number + ": " + er.message);
        socket.emit("newLog", "Error " + String(er.number) + ": " + String(er.message));
        //socket.emit('error', er);
    })

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e)
        socket.to(GUIId).emit("newLog", 'User kicked: ' + String(e));
        clients_connected();
    });

    socket.on('disconnect', (e) => {
        blink()
        if (socketToRoom[socket.id]) {
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
            //console.log(users[roomID]);
        }

        if (userIDServerList.includes(socket.id)) {
            userIDServerList.splice(userIDServerList.indexOf(socket.id), 3)
        }
        if (componentList.includes(socket.id)) {
            componentList.splice(componentList.indexOf(socket.id), 4)
        }
        //console.log(userIDServerList)

        socket.to(GUIId).emit("userLeft", (socket.id))
        socket.disconnect();
        console.log('User disconnected: ', e);
        socket.to(GUIId).emit("newLog", 'User disconnected: ' + String(e));
        clients_connected();
    });
})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})
