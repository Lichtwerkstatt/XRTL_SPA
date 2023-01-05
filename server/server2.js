const jwt = require('jsonwebtoken');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})
const { v4: uuidv4 } = require('uuid');

const roomID = uuidv4();
const users = {};
var userIDs = [];
var userIDServerList = [];
var usersInThisRoom = [];
var componentList = [];
var footerList = [];
var componentID = '';
const socketToRoom = {};
var GUIId = ""
var footerStatus = "Initializing ..."
var online = false;
var exp = ''
var broadcaster = [];
var color = [0, 60, 180, 300];
var colorList = [];

io.use(function (socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(socket.handshake.auth.token, 'keysecret', function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            exp = decoded.iat + 1800000;
            next();
        });
    }
    else {
        console.log("Authentication failed!")
        next(new Error('Authentication error'));
    }
})

io.on('connection', socket => {
    if (color.length != 0 && socket.decoded.component === 'client') {
        console.log('Connection made successfully');
        socket.emit("newLog", 'Connection made successfully');
        io.to(socket.id).emit('Auth', color[0]); //hier Farbe senden?

        colorList.push(socket.id, color[0]);
        color.splice(0, 1);

        var checkIfExpired = setInterval(() => {
            if (exp < Date.now()) {
                console.log("Client token expired");
                clearInterval(checkIfExpired);
                socket.disconnect();
            }
        }, 300000);     //checks every 5 min

    } else {
        io.to(socket.id).emit('AuthFailed');
        console.log("To many user are connected right now!")
        socket.disconnect()
    }


    socket.on('GUI', () => {
        GUIId = socket.id
    })

    socket.on('newUserInfo', (payload) => {
        socket.broadcast.emit('newUserInfo', payload)
    })

    socket.on('newLogGUI', (payload) => {
        io.to(GUIId).emit("newLog", payload)
    });

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
        socket.to(GUIId).emit("updateUser", userIDServerList)
    })

    socket.on("updateUserList", (newList) => {
        userIDServerList = newList
    })

    socket.on("updateComponents", () => {
        socket.to(GUIId).emit("updateComponents", componentList)
    })

    //The handshakes of the VIDEO CHAT

    //Sends the random generated roomID to the client how wants to join the video chat
    socket.on('roomID', (room) => {
        room(roomID);
    });

    //Sends an array with all the users in the room except the client how sends this command
    socket.on("client join room", () => {
        if (users[roomID]) {
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        usersInThisRoom = users[roomID].filter(id => id !== socket.id);
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

    socket.on('broadcaster join', (component) => {
        if (broadcaster) {
            broadcaster.push(socket.id, component,);
        } else {
            broadcaster = [socket.id, component];
        }
    })

    socket.on('viewer', (component) => {
        console.log(component)
        const id = broadcaster[broadcaster.indexOf(component) - 1]
        io.to(id).emit('viewer', socket.id);
    })

    socket.on('offer', (payload) => {
        console.log("offer?")
        io.to(payload.id).emit('offer', ({ id: socket.id, data: payload.data }));
    })

    socket.on('answer', (payload) => {
        socket.to(payload.id).emit('answer', { id: socket.id, data: payload.data })
    })

    socket.on('candidate', (payload) => {
        io.to(payload.id).emit('candidate', { id: socket.id, data: payload.data });
    })

    socket.on('watcher disconnect', () => {
        io.emit('disconnect peerConnection', socket.id);
    })

    //Handshake to handle the CHAT MESSAGES

    //Sends the new message to all users
    socket.on('message', payload => {
        socket.to(GUIId).emit("newLog", 'Message received on server: ' + JSON.stringify(payload))
        console.log('Message received on server: ', payload)
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
                command: {
                    controlId: data.controlId,
                    stream: true
                }

            });
        }
    });

    //Sends pictures of the stream to the clients
    socket.on('data', (payload) => {
        socket.to(componentID).emit('data', { componentID: componentID, type: payload.image, dataId: payload.dataId, data: { type: payload.buffer, data: payload.data } })
    });

    //Clients leaves the room after ending the stream
    socket.on('leave stream room', (data) => {
        socket.to(GUIId).emit("newLog", "User has left the room " + String(data.id));
        socket.emit('user left', socket.id);
        try {
            let roomSize = io.sockets.adapter.rooms.get(data.id).size - 1;
        } catch (error) {
            var roomSize = 0
        }

        if (roomSize == 0) {
            io.emit("command", {
                userId: data.username,
                componentId: data.id,
                command: {
                    controlId: data.controlId,
                    stream: false
                }
            });
        }
        socket.leave(data.id);
    });

    //Handshakes for command handeling

    //Transfers the command from the client to the experiment components
    socket.on('command', payload => {
        socket.to(GUIId).emit("newLog", "Command received: " + JSON.stringify(payload));
        socket.broadcast.emit('command', payload);
        console.log("Command received: ", payload);
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
        if (footerList.includes(payload) === true) {
            var statusFoot = footerList.indexOf(payload);
            footerStatus = footerList[statusFoot + 1];
            if (footerStatus === 'Component went offline!') {
                footerStatus = "Component connected!"
            }
        } else if (componentList.includes(payload)) {
            footerStatus = "Component connected!"
        } else {
            footerStatus = "Initializing ...";
        }
        online = componentList.includes(payload);
        io.emit('getFooter', { componentId: payload, status: footerStatus, online: online });
    })

    socket.on('error', (er) => {
        io.emit('error', er);
        socket.emit("newLog", "Error " + String(er.number) + ": " + String(er.message));
        console.log("Error " + er.number + ": " + er.message);
    })

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e)
        socket.to(GUIId).emit("newLog", 'User kicked: ' + String(e));
    });

    socket.on('disconnect', (e) => {
        if (socketToRoom[socket.id]) {
            io.emit('user left', socket.id)
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                usersInThisRoom = room.filter(id => id !== socket.id);
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
        }
        if (colorList.includes(socket.id)) {
            var indexColor = colorList.indexOf(socket.id) + 1;
            color.push(colorList[indexColor]);
            colorList.splice(colorList.indexOf(socket.id), 2);
        }

        if (userIDServerList.includes(socket.id)) {
            userIDServerList.splice(userIDServerList.indexOf(socket.id), 3)
        }

        if (broadcaster.includes(socket.id)) {
            broadcaster.splice(broadcaster.indexOf(socket.id), 2)
        }

        if (componentList.includes(socket.id)) {
            let com = componentList.indexOf(socket.id);
            footerStatus = 'Component went offline!';
            online = false;
            io.emit('getFooter', { componentId: componentList[com + 2], status: footerStatus, online: online });
            componentList.splice(componentList.indexOf(socket.id), 4)
        }

        socket.to(GUIId).emit("userLeft", (socket.id))
        socket.disconnect();
        console.log('User disconnected: ', e);
        socket.to(GUIId).emit("newLog", 'User disconnected: ' + String(e));
    });

    socket.on('npmStop', () => {
        process.exit(0);
    });
})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');

})
