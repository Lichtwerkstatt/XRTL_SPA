const app = require('express')();
const server = require('http').createServer(app)
const { instrument } = require('@socket.io/admin-ui');
const { log, Console } = require('console');
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
var footerList = [];
var componentID = '';
const socketToRoom = {};
var GUIId = ""
var footerStatus = "Connected!"


instrument(io, { auth: false }) //TODO: Add Authentication before deployment JKr 011221
// Connect to https://admin.socket.io/#/
// Client https://amritb.github.io/socketio-client-tool

io.on('connection', socket => {
    console.log('connection made successfully');
    socket.emit("newLog", 'Connection made successfully')

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
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    //Sends the peer to the already connected clients
    socket.on("returning signal", payload => {
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
        socket.to(GUIId).emit("newLog", "User has joined the room " + String(componentID));
        socket.join(componentID);
        let roomSize = io.sockets.adapter.rooms.get(componentID).size;

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

        if (roomSize == 0) {
            io.emit("command", {
                userId: data.username,
                componentId: data.id,
                command: "stopStreaming",
            });
        }
        socket.leave(data.id);
    });

    //Handshakes for command handeling

    //Transfers the command from the client to the experiment components
    socket.on('command', payload => {
        //console.log("Command received: ", payload);
        socket.to(GUIId).emit("newLog", "Command received: " + JSON.stringify(payload));
        socket.broadcast.emit('command', payload);
    });

    //Returns the status of a experiment component
    socket.on('status', payload => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        if (componentList.includes(socket.id) === false) {
            componentList.push(socket.id, time, payload.componentId, payload.status.busy);
        }
        else if (componentList.includes(socket.id) === true) {

        } else {
            componentList = [socket.id, time, payload.componentId, payload.status.busy];
        }
        socket.to(GUIId).emit("newLog", "New Status" + JSON.stringify(payload));
        socket.emit("newComponent", componentList);
        socket.broadcast.emit('status', payload);
        console.log("New status: ", payload)
    });

    socket.on('footer', payload => {
        if (footerList.includes(payload.componentId) === false) {
            footerList.push(payload.componentId, payload.status)
        } else if (footerList.includes(payload.componentId) === true) {
            var newStatus = footerList.indexOf(payload.componentId)
            footerList[newStatus + 1] = payload.status
        }

        io.emit('footer', payload)
    })

    socket.on('getFooter', payload => {
        console.log(componentList.includes(payload))
        if (footerList.includes(payload) === true) {
            var statusFoot = footerList.indexOf(payload);
            var online = componentList.includes(payload);
            footerStatus = footerList[statusFoot + 1]
        }
        console.log("liste ", componentList.includes(payload))
        console.log("online ?", online);
        console.log(footerStatus);
        io.emit('getFooter', { componentId: payload, status: footerStatus, online: online });
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
    });

    socket.on('disconnect', (e) => {
        if (socketToRoom[socket.id]) {
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
        }

        if (userIDServerList.includes(socket.id)) {
            userIDServerList.splice(userIDServerList.indexOf(socket.id), 3)
        }
        if (componentList.includes(socket.id)) {
            componentList.splice(componentList.indexOf(socket.id), 4)
        }

        socket.to(GUIId).emit("userLeft", (socket.id))
        socket.disconnect();
        console.log('User disconnected: ', e);
        socket.to(GUIId).emit("newLog", 'User disconnected: ' + String(e));
    });
})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');

})
