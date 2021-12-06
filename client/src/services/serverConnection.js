

export default function serverConnection(socket, state) {

    if (state === true) {
        socket.connect("http://localhost:7000");
        state = true;
    } else {
        socket.disconnect();
        state = false;

    }

    return state

}

