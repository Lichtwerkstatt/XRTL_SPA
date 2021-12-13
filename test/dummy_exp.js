const io = require('socket.io-client');
const socket = io("http://localhost:7000");

var KM100_1 = {
    componentId: "km100_1",
    status: {
        busy: false,
        top: 100,
        bottom: 200
    }
};
var KM100_2 = {
    componentId: "km100_2",
    status: {
        busy: false,
        top: 10,
        bottom: 50
    }
};

socket.on("connect", () => {
    console.log("SocketID: " + socket.id); // Outputs the socket ID
    socket.emit("connection", "User connected!")
});

socket.on("message", () => {
    console.log("Hello World!");
    socket.emit('message', ("beetlebum", "Hello World!"));       //Output-> beetlebum: Hello World!
});

socket.on("command", () => {
    console.log("user1234", "km100_1", "top", 100);
    socket.emit('command', {
        userId: "user123",
        componentId: KM100_1.componentId,
        controlId: "top",
        command: {
            steps: 100,
        }
    })
});

socket.on("command", () => {
    console.log("km100_1", KM100_1.status.busy, KM100_1.status.top, KM100_1.status.bottom);
    socket.emit('rotation', {
        userId: "user123",
        componentId: KM100_1.componentId,
        status: {
            busy: KM100_1.status.busy,
            top: KM100_1.status.top,
            bottom: KM100_1.status.bottom
        }
    });

    sleep(2000);

    console.log("km100_1", false, KM100_1.status.top, KM100_1.status.bottom);
    socket.emit('command', {
        userId: "user123",
        componentId: KM100_1.componentId,
        status: {
            busy: false,
            top: KM100_1.status.top,
            bottom: KM100_1.status.bottom
        }
    });
});

socket.on("connect", () => {
});

socket.on("disconnect", () => {
    console.log("User will disconnect");
    socket.disconnect();
    console.log(socket.id); // Outputs undefined
});

