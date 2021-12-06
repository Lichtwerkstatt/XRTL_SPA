import React, { useState, useContext, useCallback, useEffect } from 'react';
import { SocketContext } from '../services/socket';

const GrandChild = () => {
    const userId = "Clara"
    const socket = useContext(SocketContext);

    const [joined, setJoined] = useState(true);

    const handleInviteAccepted = useCallback(() => {
        console.log("Button  geklickt")
        setJoined(false);
        socket.emit("message", "Button geklickt")
    }, []);

    const handleJoinChat = useCallback(() => {
        socket.emit("SEND_JOIN_REQUEST");
    }, []);


    useEffect(() => {
        // as soon as the component is mounted, do the following tasks:

        // emit USER_ONLINE event
        socket.emit("USER_ONLINE", userId);

        // subscribe to socket events
        socket.on("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);

        return () => {
            // before the component is destroyed
            // unbind all event handlers used in this component
            socket.off("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);
        };
    }, [socket, userId, handleInviteAccepted]);

    return (
        <div>
            <font color="#ff9900">
                {joined ? (
                    <p>Click the button to send a request to join chat!</p>
                ) : (
                    <p>Congratulations! You are accepted to join chat!</p>
                )}
                <button onClick={handleInviteAccepted}>
                    Join Chat
                </button>
                <h1>Hallo {userId}</h1>
            </font>
        </div>
    );
};

export default GrandChild;
