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

io.on('connection', socket => {
    console.log('connection made successfully');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('forceDisconnect',() => {
        socket.disconnect();
        console.log('User kicked')
    })

    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        io.emit('message', payload)
    })

    socket.on('Experiment', (experiment) => {
        console.log('Experiment ausgewählt: ', experiment)
    })

    socket.on('control', payload => {
        console.log("Control command received:", payload)
        io.emit('control', payload)
    })

    socket.on('connectionStatus', () => {
        console.log('Connection made successfully!');
    });

})

server.listen(7000, () => {
    console.log('I am listening at port: 7000)');
})


