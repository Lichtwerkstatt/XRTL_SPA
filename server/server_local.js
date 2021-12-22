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
        io.emit('command', payload)
    })

    socket.on('status', payload => {
        console.log("New Status", payload)
        io.emit('status', payload)
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


