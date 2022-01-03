const users = {};
const socketToRoom = {};
const app = require('express')();
const server = require('http').createServer(app)
const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const { v4: uuidv4 } = require('uuid');
const roomID = uuidv4();
const rooms = {};

instrument(io, { auth: false }) //TODO: Add Authentication before deployment JKr 011221
// Connect to https://admin.socket.io/#/
// Client https://amritb.github.io/socketio-client-tool

io.on('connection', socket => {
    console.log('connection made successfully');

    socket.on('roomID', (room) => {
        room(roomID);
        //console.log("RoomID (" + roomID + ") was trasnmitted to the client");

    });

    socket.on('join-room', (roomID) => {        //auf UserID umstellen, weil Raumid (uuid) immer dieselbe ist
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
         //   console.log(rooms)
        } else {
            rooms[roomID] = [socket.id];
           // console.log(rooms)

        }
        
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        console.log(socket.id)
        if (otherUser) {
           // users[roomID].push(socket.id)
            //console.log("User"+users)
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    // socket.on('disconnect', (e) => {
    //     console.log('User disconnected: ',e);
    // });

    socket.on('forceDisconnect', (e) => {
        socket.disconnect();
        console.log('User kicked: ', e)
    });

    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        io.broadcast.emit('message', payload)
    });

    socket.on('Experiment', (experiment) => {
        console.log('Experiment ausgewählt: ', experiment)
    });

    socket.on('command', payload => {
        console.log("Command received:", payload)
        io.emit('command', payload)
    });

    socket.on('status', payload => {
        console.log("New Status", payload)
        io.emit('status', payload)
    });

    /*   socket.on("callUser", (payload) => {
          io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
      });
  
      socket.on("answerCall", (payload) => {
          io.to(data.to).emit("callAccepted", data.signal)
      }); */

    /*     socket.on("join room", roomID => {
            if (users[roomID]) {
                const length = users[roomID].length;
                if (length === 4) {
                    socket.emit("room full");
                    return;
                }
                users[roomID].push(socket.id);
            } else {
                users[roomID] = [socket.id];
            }
            socketToRoom[socket.id] = roomID;
            const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
    
            socket.emit("all users", usersInThisRoom);
        });
    
        socket.on("sending signal", payload => {
            io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        });
    
        socket.on("returning signal", payload => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        }); */

    socket.on('disconnect', (e) => {
        console.log('User disconnected: ', e);
        //delete users[socket.id];
        socket.disconnect();
    });


})

server.listen(7000, () => {
    console.log('I am listening at port: 7000!');
})


