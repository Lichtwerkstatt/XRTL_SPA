const io = require('socket.io-client')

const socket = io("http://localhost:7000");

socket.on("connect", () => {
    console.log("SocketID: " + socket.id); // Outputs the socket ID
    socket.emit("connection", "User connected!")

/*     console.log("Hello World!");
    socket.emit('message', ("beetlebum", "Hello World!"));       //Output-> beetlebum: Hello World!

    console.log("user1234", "km100_1", "top", 100);
    socket.emit('rotationControl', { username: "user1234", componentId: "km100_1", controlId: "top", steps: 100 });

    console.log("km100_1", true, 100, 180, 200);
    socket.emit('rotationStatus', { componentId: "km100_1", busy: true, top: 180, bottom: 200 });

    console.log("User will disconnect");

    socket.disconnect();
    console.log(socket.id); // Outputs undefined
 */
});

socket.on("message", () => {
    console.log("Hello World!");
    socket.emit('message', ("beetlebum", "Hello World!"));       //Output-> beetlebum: Hello World!
});

socket.on("rotationControl", () => {
    console.log("user1234", "km100_1", "top", 100);
    socket.emit('rotationControl', { username: "user1234", componentId: "km100_1", controlId: "top", steps: 100 });

});

socket.on("rotationStatus", () => {
    console.log("km100_1", true, 100, 180, 200);
    socket.emit('rotationStatus', { componentId: "km100_1", busy: true, top: 180, bottom: 200 });

});

socket.on("connect", () => { });

socket.on("disconnect", () => {
    console.log("User will disconnect");

    socket.disconnect();
    console.log(socket.id); // Outputs undefined
});






