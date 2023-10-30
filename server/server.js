
/**
 * Required Packages with some predefined properties
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

/**
 * Initialisation of variables required in the code
*/
var pw = process.env.KEY_4;
var color = ['#FF7F00', '#00FFFF', '#FF00FF', '#FFFF00'];
var footerStatus = 'Initializing ...';
var underConstruction = false;
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
    socket.to(socket.id).emit('time', Date.now());
    next();
})

// Authetification process using middleware
io.use((socket, next) => {
    //Incoming socket request must have these dictionary entries, otherwise request is rejected and authentication fails.
    if (socket.handshake.auth && socket.handshake.auth.token) {
        //Authefication with the previously assigned key, if this fails, an error is thrown, otherwise the connection is established.
        jwt.verify(socket.handshake.auth.token, 'keysecret', (err, decoded) => {
            if (err) {
                console.log('Authentication failed!')
                return next(new Error('Authentication error'));
            }
            // Decrypted data are saved
            socket.decoded = decoded;
            next();
        });
    }
    else {
        console.log('Authentication failed!')
        next(new Error('Authentication error'));
    }
})

io.on('connection', socket => {
    //Connecting process for admin, client and components
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
        socket.emit('underConstruction', underConstruction);
    }
    else if (color.length != 0 && socket.decoded.component === 'client') {
        console.log('Client connected successfully');
        socket.emit('newLog', 'Connection made successfully');
        io.to(socket.id).emit('Auth', color[0]);
        socket.emit('underConstruction', underConstruction);

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

    //Transfers the command from the client to the experiment components
    socket.on('command', payload => {
        socket.to(GUIId).emit('newLog', 'Command received: ' + JSON.stringify(payload));
        socket.broadcast.emit('command', payload);
        console.log('Command received: ', payload);
        exp = Date.now() + 300000;
    });

    // A new value is assigned to the global variable and it is sent to all clients whether the female page is currently under construction or not.
    socket.on('underConstruction', payload => {
        underConstruction = payload;
        socket.broadcast.emit('underConstruction', underConstruction);
        console.log('underConstruction is now set on: ', payload);
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

    // Update of the footer within the associated list after a change has been made to a component
    socket.on('footer', payload => {
        if (footerList.includes(payload.controlId) === false) {
            footerList.push(payload.controlId, payload.status);
        } else if (footerList.includes(payload.controlId) === true) {
            var newStatus = footerList.indexOf(payload.controlId);
            footerList[newStatus + 1] = payload.status;
        }
        io.emit('footer', payload)
    })

    // When the component window is opened, this event sends the footer, which is then displayed in the window.
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

    // Sends data from the components in the lab to the clients of the web application
    socket.on('data', (payload) => {
        socket.to(payload.controlId).emit('data', (payload))
    });

    //Clients leaves the room after closing the camera window
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

    //Error handling
    socket.on('error', (er) => {
        io.emit('error', er);
        socket.emit('newLog', 'Error ' + String(er.number) + ': ' + String(er.message));
        console.log('Error ' + er.number + ': ' + er.message);
    })

    // Forces the disconnect of a client
    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        socket.to(GUIId).emit('newLog', 'User kicked: ' + String(e));
        console.log('User kicked: ', e);
    });

    // Handles the disconnection of a client
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

    // To get the socketid of the GUI in order to send commands to it specifically
    socket.on('GUI', () => {
        GUIId = socket.id
    })

    // If there is a new log, it is forwarded to the GUI.
    socket.on('newUserInfo', (payload) => {
        socket.broadcast.emit('newUserInfo', payload)
    })

    socket.on('newLogGUI', (payload) => {
        io.to(GUIId).emit('newLog', payload)
    });

    // Sends to all clients that a new user has connected to the web application.
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

    //  When the GUI has been closed and reopened, this command ensures that the user list is up to date.
    socket.on('updateUser', () => {
        io.emit('updateUser', userIDServerList);
        socket.to(GUIId).emit('updateUser', userIDServerList)
    })

    socket.on('updateUserList', (newList) => {
        userIDServerList = newList
    })

    // When the GUI is closed and reopened, this command ensures that the component list is up to date.
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