import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../services/AppContext";
var Peer = require('simple-peer');
var roomID = '';

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} />
    );
}

const Webcam = () => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);

    const videoConstraints = {
        height: window.innerHeight / 2,
        width: window.innerWidth / 2
    };

    useEffect(() => {
        if (appCtx.showWebcam) {
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
                socketCtx.socket.emit('roomID', (data) => { //Transmission of the rromID
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

                socketCtx.socket.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream); //creates a new peer & adds it to the list for a freshly joining client
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })

                    setPeers(users => [...users, peer]);
                });

                socketCtx.socket.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });
            })
        }
    }, [appCtx.showWebcam])

    function createPeer(userToSignal, callerID, stream) {       //Erstellen von peer des 1. joinenden Clienten
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketCtx.socket.emit("sending signal", ({ userToSignal, callerID, signal }));
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
    if (appCtx.showWebcam) {
        return (
            <div className='webcamDiv'>
                <video muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    );
                })}
            </div>
        );
    }
    else {
        return <></>;
    }
};

export default Webcam;