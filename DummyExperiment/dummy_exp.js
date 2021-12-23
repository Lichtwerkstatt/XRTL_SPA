const io = require("socket.io-client");
const socket = io.connect("http://localhost:7000");

var Exp = [
  {
    id: "KM100_1",
    type: "doubleRotaryCtrl",
    status: {
      busy: false,
      top: 0,
      bottom: 0,
    },
  },
  {
    id: "KM100_2",
    type: "doubleRotaryCtrl",
    status: {
      busy: false,
      top: 0,
      bottom: 0
    }
  },
  {
    id: "SM1ZP_1",
    type: "singleRotaryCtrl",
    status: {
      busy: false,
      pos: 0
    }
  },
];

socket.on("connect", () => {
  console.log("SocketID: " + socket.id);
  socket.emit("connection", "User connected!");
});


socket.on("command", payload => {
  Exp.forEach(comp => {
    if (payload.componentId === comp.id) {
      switch (comp.type) {
        case "doubleRotaryCtrl":
          comp.status.busy = true;
          socket.emit("status", { componentId: comp.id, status: comp.status })
          if (payload.controlId === "top") {
            comp.status.top += +payload.command.steps
          } else {
            comp.status.bottom += +payload.command.steps
          }
          setTimeout(() => {
            comp.status.busy = false;
            socket.emit("status", { componentId: comp.id, status: comp.status })
          }, 3000);
          break;
        case "singleRotaryCtrl":
          comp.status.busy = true;
          socket.emit("status", { componentId: comp.id, status: comp.status })
          comp.status.pos += +payload.command.steps
          setTimeout(() => {
            comp.status.busy = false;
            socket.emit("status", { componentId: comp.id, status: comp.status })
          }, 3000)
      }
    }
  })
})

// socket.on("command", (payload) => {
//   console.log("Command received");
//   socket.emit("status", {
//     componentId: "KM100_1",
//     status: {
//       busy: true,
//       top: KM100_1.status.top,
//       bottom: KM100_1.status.bottom,
//     },
//   });
//   setTimeout(() => {
//     socket.emit("status", {
//       componentId: "KM100_1",
//       status: {
//         busy: false,
//         top: +KM100_1.status.top + +payload.command.steps,
//         bottom: KM100_1.status.bottom,
//       },
//     });
//   }, 3000);
// });

socket.on("disconnect", () => {
  console.log("User will disconnect");
  socket.disconnect();
  console.log(socket.id); // Outputs undefined
});
