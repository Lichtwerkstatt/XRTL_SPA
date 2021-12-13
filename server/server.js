var Gpio = require('onoff').Gpio;
var LED = new Gpio(12, 'out');
var R = new Gpio(13, 'out')
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

function LED_on() {
      LED.writeSync(1); // Turn LED on
 
  }
  
  function LED_off() { 
    LED.writeSync(0); // Turn LED off
  }
  
io.on('connection', socket => {
    console.log('connection made successfully');
    LED.writeSync(1);
    R.writeSync(1);


    socket.on('disconnect', (e) => {
        console.log('User disconnected: ',e);
        LED.writeSync(0);
    });

    socket.on('forceDisconnect',(e) => {
        socket.disconnect();
        console.log('User kicked: ',e)
        LED.writeSync(0);
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


