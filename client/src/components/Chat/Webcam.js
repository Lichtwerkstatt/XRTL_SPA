import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect } from "react";
import { useAppContext } from "../../services/AppContext";
import styles from "./Webcam.module.css";
var Peer = require('simple-peer');
var roomID = '';

export const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer?.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video data-testid="webcam-host" playsInline autoPlay ref={ref} />
    );
}

export const Webcam = () => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [peers, setPeers] = React.useState([]);
    const userVideo = React.useRef();
    const peersRef = React.useRef([]);


    useEffect(() => {
        const videoConstraints = {
            height: window.innerHeight / 2,
            width: window.innerWidth / 2
        };
        if (appCtx?.showWebcam) {
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
                socketCtx?.socket.emit('roomID', (data) => { //Transmission of the roomID
                    roomID = data;
                });

                socketCtx.socket.emit('client join room', (roomID)); // new client will be added to the userList

                socketCtx.socket.on('all users', users => {
                    const peers = [];
                    users.forEach(userID => {
                        const peer = createPeer(userID, socketCtx.socket.id, stream);       // creates a peer for each client that is already in the room
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
                        peers.push(peer);
                    })
                    setPeers(peers);
                })

                socketCtx?.socket.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream); //creates a new peer & adds it to the list for a freshly joining client
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })

                    setPeers(users => [...users, peer]);
                });

                socketCtx?.socket.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });
            })
        }
        function createPeer(userToSignal, callerID, stream) {       //Erstellen von peer für alle bisher Clienten die sich bisher im Raum schon befinden
            const peer = new Peer({
                initiator: true,        //wichtig, damit Stream in die gesendet werden kann
                trickle: false,
                stream,     //eigener Stream
            });

            peer.on("signal", signal => {
                socketCtx?.socket.emit("sending signal", ({ userToSignal, callerID, signal }));
            })
            return peer;
        }

        function addPeer(incomingSignal, callerID, stream) {        //creates peers for all following joining clients
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream,
            });

            peer.on("signal", signal => {
                socketCtx.socket.emit("returning signal", { signal, callerID });
            });
            peer.signal(incomingSignal);
            return peer;
        }
    }, [appCtx?.showWebcam])

    if (appCtx?.showWebcam) {
        return (
            <div data-testid="empty-stream2" className={styles.webcamDiv}>
                <video className={styles.videoSt} muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {           //wenn man diese Schleife weglässt, dann wird nur der eigene Stream dargestellt
                    return (
                        <Video key={index} peer={peer} />
                    );
                })}
            </div>
        );
    }
    else {
        return <div data-testid="empty-stream" />;
    }
};
