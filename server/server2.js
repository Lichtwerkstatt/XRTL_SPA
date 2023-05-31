const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

var pw = fs.readFileSync("", 'utf8');
var color = ['#FF7F00', '#00FFFF', '#FF00FF', '#FFFF00'];
var footerStatus = 'Initializing ...';
var userIDServerList = [];
var componentList = [];
var broadcaster = [];
var footerList = [];
var colorList = [];
var online = false;
var userIDs = [];
var GUIId = '';
var exp = ''

const returnNumber = (string) => {
    var number = [];
    var a = '';
    for (var i = 0; i < string.length; i += 2) {
        if (string.charCodeAt(i + 1)) {
            number.push(string.charCodeAt(i) + string.charCodeAt(i + 1))
        } else {
            number.push(string.charCodeAt(i))
        }
    }

    for (var i = 0; i < number.length; i++) {
        a += number[i];
    }
    return a;
}

io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(socket.handshake.auth.token, 'keysecret', (err, decoded) => {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            exp = decoded.iat + 300000;
            next();
        });
    }
    else {
        console.log('Authentication failed!')
        next(new Error('Authentication error'));
    }
})

io.on('connection', socket => {
    if (socket.decoded.component === 'client') {
        var master = returnNumber(socket.decoded.sub);
        var date = new Date();
        date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        var masterSocket = pw + returnNumber(date);
    }

    if (socket.decoded.component === 'client' && masterSocket === master) {
        console.log('Supervisor connected successfully');
        socket.emit('newLog', 'Connection made successfully');
        io.to(socket.id).emit('Auth', '#FFFFF');
    }
    else if (color.length != 0 && socket.decoded.component === 'client') {
        console.log('Client connected successfully');
        socket.emit('newLog', 'Connection made successfully');
        io.to(socket.id).emit('Auth', color[0]);

        colorList.push(socket.id, color[0]);
        color.splice(0, 1);

        var checkIfExpired = setInterval(() => {
            if (exp < Date.now()) {
                clearInterval(checkIfExpired);
                socket.disconnect();
                console.log('Client token expired');
            }
        }, 120000);     //checks every 2 min 
    }
    else if (color.length === 0 && socket.decoded.component === 'client') {
        io.to(socket.id).emit('AuthFailed');
        socket.disconnect();
        console.log('To many user are connected right now!');
    }
    else if (socket.decoded.component === 'component') {
        io.to(socket.id).emit('Auth');
        console.log('Component connected successfully');
    }
    else {
        socket.disconnect();
    }

    //General & important handshakes 

    //Sends the new message to all users
    socket.on('message', payload => {
        socket.to(GUIId).emit('newLog', 'Message received on server: ' + JSON.stringify(payload))
        console.log('Message received on server: ', payload)
        io.emit('message', payload)
    });
    //Handshakes for command handeling

    //Transfers the command from the client to the experiment components
    socket.on('command', payload => {
        socket.to(GUIId).emit('newLog', 'Command received: ' + JSON.stringify(payload));
        socket.broadcast.emit('command', payload);
        console.log('Command received: ', payload);
        exp = Date.now() + 300000;
    });

    socket.on('LED', payload => {
        socket.broadcast.emit('LED', payload);
        console.log('LED received: ', payload);
    });


    //Returns the status of a experiment component
    socket.on('status', payload => {
        var today = new Date();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        if (componentList) {
            if (componentList.includes(payload.controlId) === false) {
                componentList.push(socket.id, time, payload.controlId, payload.status.busy);
            }
        } else {
            componentList = [socket.id, time, payload.controlId, payload.status.busy];
        }

        // GUI
        socket.to(GUIId).emit('newLog', 'New Status' + JSON.stringify(payload));
        socket.to(GUIId).emit('newComponent', componentList);

        //For the clients
        socket.broadcast.emit('status', payload);
        console.log('New status: ', payload);
    });

    socket.on('footer', payload => {
        if (footerList.includes(payload.controlId) === false) {
            footerList.push(payload.controlId, payload.status);
        } else if (footerList.includes(payload.controlId) === true) {
            var newStatus = footerList.indexOf(payload.controlId);
            footerList[newStatus + 1] = payload.status;
        }
        io.emit('footer', payload)
    })

    socket.on('getFooter', payload => { //reicht unteren zwei Fälle?
        if (footerList.includes(payload) === true) {
            var footerPos = footerList.indexOf(payload);
            footerStatus = footerList[footerPos + 1];
            if (footerStatus === 'Component went offline!') {
                footerStatus = 'Component connected!';
            }
        } else if (componentList.includes(payload)) {
            footerStatus = 'Component connected!';
        } else {
            footerStatus = 'Initializing... ';
        }
        online = componentList.includes(payload);
        io.emit('getFooter', { controlId: payload, status: footerStatus, online: online });
    })

    //WebRTC handshake for the overview stream of the experiment
    socket.on('broadcaster join', (controlId) => {
        if (broadcaster) {
            broadcaster.push(socket.id, controlId,);
        } else {
            broadcaster = [socket.id, controlId];
        }
    })

    socket.on('viewer', (controlId) => {
        const id = broadcaster[broadcaster.indexOf(controlId) - 1]
        io.to(id).emit('viewer', socket.id);
    })

    socket.on('offer', (payload) => {
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

    //Handshakes for the experiment camera (ESPCam)

    //Client how starts the stream is added to a room
    socket.on('join stream room', (payload) => {
        socket.to(GUIId).emit('newLog', 'User has joined the room ' + String(payload.controlId));
        socket.join(payload.controlId);
        let roomSize = io.sockets.adapter.rooms.get(payload.controlId).size;
        if (roomSize == 1) {
            socket.broadcast.emit('command', {
                userId: payload.username,
                controlId: payload.controlId,
                stream: true
            });
        }
    });

    //Sends pictures of the stream to the clients
    socket.on('data', (payload) => {//hier einfach payload senden?
        socket.to(payload.controlId).emit('data', (payload))
    });

    //Clients leaves the room after ending the stream
    socket.on('leave stream room', (payload) => {
        socket.to(GUIId).emit('newLog', 'User has left the room ' + String(payload.controlId));
        socket.emit('user left', socket.id);
        try {
            var roomSize = io.sockets.adapter.rooms.get(payload.controlId).size - 1;
        } catch (error) {
            var roomSize = 0
        }

        if (roomSize == 0) {
            socket.broadcast.emit('command', {
                userId: payload.username,
                controlId: payload.controlId,
                stream: false
            });
        }
        socket.leave(payload.controlId);
    });

    //Error & diconnect handling
    socket.on('error', (er) => {
        io.emit('error', er);
        socket.emit('newLog', 'Error ' + String(er.number) + ': ' + String(er.message));
        console.log('Error ' + er.number + ': ' + er.message);
    })

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        socket.to(GUIId).emit('newLog', 'User kicked: ' + String(e));
        console.log('User kicked: ', e);
    });

    socket.on('disconnect', (e) => {
        if (colorList.includes(socket.id)) {
            var indexColor = colorList.indexOf(socket.id) + 1;
            color.push(colorList[indexColor]);
            colorList.splice(colorList.indexOf(socket.id), 2);
        }

        if (userIDServerList.includes(socket.id)) {
            userIDServerList.splice(userIDServerList.indexOf(socket.id), 3);
        }

        if (broadcaster.includes(socket.id)) {
            broadcaster.splice(broadcaster.indexOf(socket.id), 2);
        }

        if (componentList.includes(socket.id)) {
            let com = componentList.indexOf(socket.id);
            io.emit('getFooter', { controlId: componentList[com + 2], status: 'Component went offline!', online: false });
            componentList.splice(componentList.indexOf(socket.id), 4);
        }

        socket.to(GUIId).emit('userLeft', (socket.id))
        socket.to(GUIId).emit('newLog', 'User disconnected: ' + String(e));

        clearInterval(checkIfExpired);
        socket.disconnect();
        console.log('User disconnected: ', e);
    });

    //GUI commands
    socket.on('GUI', () => {
        GUIId = socket.id
    })

    socket.on('newUserInfo', (payload) => {
        socket.broadcast.emit('newUserInfo', payload)
    })

    socket.on('newLogGUI', (payload) => {
        io.to(GUIId).emit('newLog', payload)
    });

    socket.on('userId', (newUser) => {
        var today = new Date();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        if (userIDServerList) {
            userIDServerList.push(socket.id, time, newUser)
        } else {
            userIDServerList = [socket.id, time, newUser]
        }
        userIDs = [socket.id, time, newUser]
        socket.broadcast.emit('newUser', (time, userIDs))
        socket.to(GUIId).emit('newLog', 'User connected successfully')
    })

    socket.on('updateUser', () => {
        io.emit('updateUser', userIDServerList);
        socket.to(GUIId).emit('updateUser', userIDServerList)
    })

    socket.on('updateUserList', (newList) => {
        userIDServerList = newList
    })

    socket.on('updateComponents', () => {
        socket.to(GUIId).emit('updateComponents', componentList)
    })

    socket.on('npmStop', () => {
        process.exit(0);
    });
})

server.listen(3000, () => {
    console.log('Server is listening at port: 3000!');

})