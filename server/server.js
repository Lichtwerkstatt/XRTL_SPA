// var Gpio = require('onoff').Gpio;
// var LED = new Gpio(12, 'out');
// var green = new Gpio(16, 'out')
// var blue = new Gpio(20, 'out')
// var red = new Gpio(21, 'out')
const time = require('sleep');
const app = require('express')()
const server = require('http').createServer(app)
const { instrument } = require('@socket.io/admin-ui')
const { time } = require('console')
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
    if (io.engine.clientsCoun == 0) {
        RGB(1, 0, 0);
    } else {
        RGB(0, 1, 0)
    }
}

function command_received() {
    for (i = 0; i < 5; i++) {
        RGB(0, 0, 1);
        sleep(2);
        RGB(0, 0, 0);
    }
    clients_connected();
}

RGB(1, 0, 0);
io.on('connection', socket => {
    console.log('connection made successfully');
    // LED.writeSync(1);
    RGB(0, 1, 0);
    console.log(io.engine.clientsCount)

    socket.on('disconnect', (e) => {
        console.log('User disconnected: ', e);
        //LED.writeSync(0);
        console.log(io.engine.clientsCount)
        clients_connected();
    });

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e)
        clients_connected();
        //LED.writeSync(0);
    })

    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        io.emit('message', payload)

    })

    socket.on('Experiment', (experiment) => {
        console.log('Experiment ausgewählt: ', experiment)
    })

    socket.on('command', payload => {
        console.log("Command received:", payload)
        io.emit('control', payload)
    })

})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})


