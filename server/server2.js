/**
 * Sever documentation
 * 
 * @description This file contains the code for the server. The server can be started with "node server.js" after "npm install" has been executed. At the beginning of the code, 
 * various parameters that apply to the server can be set. 
 * 
 * @param {number} PORT - Defines the port on which the server should run, which is usually 300.
 */
const PORT = 3000;
//const passwordFile = fs.readFileSync("", 'utf8');
//const tokenClient;
//const tokenComponents;
//const tokenAdmin;

/**
 * Required Packages with some predefined properties
 */
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

/**
 * Initialisation of variables required in the code
 */
var color = ['#FF7F00', '#00FFFF', '#FF00FF', '#FFFF00']; //List of colours that can be assigned to the clients and in which the LED rings light up in case of changes.
var footerStatus = 'Initializing ...'; // Sets the default value for the footer of windows.
var underConstruction = false; // Is used for the app as feedback to indicate whether the website is currently under construction.
var userIDServerList = []; // List contains all socketIds, names and time of connection of all connected clients.
var componentList = []; // List contains all connected components.
var footerList = [];// List contains all footers of the component windows.
var colorList = []; // List contains all colours assigned to connected clients. 
var GUIId = ''; // Is later overwritten with the socket.id of the GUI, whereby specific commands can be sent to it.
var exp = '' // Overwritten with the expired time of the respective client.

/**
 * 
 * @param {*} string 
 * @returns 
 */
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
            exp = Date.now() + 300000;
            next();
        });
    }
    else {
        console.log('Authentication failed!')
        next(new Error('Authentication error'));
    }
})

io.on('connection', socket => {
   /*  if (socket.decoded.component === 'client') {
        var master = returnNumber(socket.decoded.sub);
        var date = new Date();
        date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        var masterSocket = passwordFile + returnNumber(date);
    }

    if (socket.decoded.component === 'client' && masterSocket === master) {
        console.log('Supervisor connected successfully');
        socket.emit('newLog', 'Connection made successfully');
        io.to(socket.id).emit('Auth', '#FFFFF');
        socket.emit('underConstruction', underConstruction);
    } else */  if (color.length != 0 && socket.decoded.component === 'client') {
        console.log('Client connected successfully');
        socket.emit('newLog', 'Connection made successfully');
        io.to(socket.id).emit('Auth', color[0], Date.now());
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
        io.to(socket.id).emit('Auth',);
        console.log('Component connected successfully');
    }
    else {
        socket.disconnect();
    }

    //General & important handshakes 

    // Sends a command if a new user has established a connection to the web application.
    socket.on('newUserInfo', (payload) => {
        socket.broadcast.emit('newUserInfo', payload)
    })

    //Sends the new chat message to all users
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

        // To the GUI
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
    socket.on('getFooter', payload => {
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
        componentList.includes(payload) ? componentList.includes(payload) : false;
        io.emit('getFooter', { controlId: payload, status: footerStatus, online: online });
    })

    //Handshakes for the experiment camera (ESPCam)

    // When the client opens a camera window, it is added to the room of the respective components.
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
    socket.on('data', (payload) => {//hier einfach payload senden?
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
        var userIDs = [socket.id, time, newUser]
        socket.broadcast.emit('newUser', (time, userIDs))
        socket.to(GUIId).emit('newLog', 'User connected successfully')
    })

    //  When the GUI has been closed and reopened, this command ensures that the user list is up to date.
    socket.on('updateUser', () => {
        io.emit('updateUser', userIDServerList);
        socket.to(GUIId).emit('updateUser', userIDServerList)
    })

    //// When the GUI is closed and reopened, this command ensures that the component list is up to date.
    socket.on('updateComponents', () => {
        socket.to(GUIId).emit('updateComponents', componentList)
    })
})

// Starts a server under http://localhost:PORT/ 
server.listen(PORT, () => {
    console.log('Server is listening at port: ' + PORT + '!');

})