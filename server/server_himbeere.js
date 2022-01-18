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
    console.log("hier");
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


    socket.on('disconnect', (e) => {
        blink();
        console.log('User disconnected: ', e);
        clients_connected();
    });

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e);
        clients_connected();
    })

    socket.on('message', payload => {
        blink();
        console.log('Message received on server: ', payload);
        io.emit('message', payload);

    })

    socket.on('Experiment', (experiment) => {
        blink();
        console.log('Experiment ausgewählt: ', experiment);
    })

    socket.on('command', payload => {
        blink();
        console.log("Command received:", payload);
        io.emit('control', payload);
    })
    
    socket.on("callUser", (payload) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (payload) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})


