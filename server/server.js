const gpio = require('rpi-gpio')
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

process.on("SIGINT", ()=>{
    gpio.write(12,true, ()=>{
        gpio.destroy(()=>{
            process.exit();
        })
    })
})

gpio.setup(12, gpio.DIR_OUT, ()=>{
    gpio.write(12, true);
})

io.on('connection', socket => {
    console.log('connection made successfully');
    gpio.write(12, false);

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


