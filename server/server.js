var gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var blinkInterval = setInterval(blinkLED, 250);
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

function blinkLED() { //function to start blinking
    if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
      LED.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
      LED.writeSync(0); //set pin state to 0 (turn LED off)
    }
  }
  
  function endBlink() { //function to stop blinking
    clearInterval(blinkInterval); // Stop blink intervals
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport GPIO to free resources
  }
  
  setTimeout(endBlink, 5000); //stop blinking after 5 seconds 

io.on('connection', socket => {
    console.log('connection made successfully');
    blinkLED();
    

    socket.on('disconnect', (e) => {
        console.log('User disconnected: ',e);
    });

    socket.on('forceDisconnect',(e) => {
        socket.disconnect();
        console.log('User kicked: ',e)
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


