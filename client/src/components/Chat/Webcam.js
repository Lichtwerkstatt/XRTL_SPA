import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect } from "react";
var Peer = require('simple-peer')
var roomID = '';

const Webcam = (props) => {
    const socketCtx = useSocketContext();
    const webcamElement = document.getElementById("videostream");


    if (socketCtx.socket.connected == true) {           //Client mus mit Server verbudnen sein, damit dieser Code aufgeführt wird
        socketCtx.socket.emit('roomID', (data) => {     //übertragen der Server/Room ID an CLient
            roomID = data;
        });

        socketCtx.socket.emit('join-room', roomID)      //Client tritt KEINEN Raum hier bei
        socketCtx.socket.on('other user', (userID) => {     //sendet an alle außerdem dem sendenden Client die Nachriht, dass xy connected hat
            console.log("User connected: " + userID);
        });

        const constraints = {           //contraints der Webcam
            audio: true,
            video: {
                width: 400, height: 300
            }
        }

        async function init() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                handleSuccess(stream);
            } catch (e) {
                console.error("Something went wrong with the camera");
            }
        }

        function handleSuccess(stream) {
            window.stream = stream
            webcamElement.srcObject = stream
        }
        init()
    }


    return (
        <div>

            <video autoplay="true" id="videostream" >

            </video>
        </div>
    );

};

export default Webcam;



/* import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import { useSocketContext } from '../../services/SocketContext'

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;



const Video = (props) => {



    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Webcam = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);

    var roomID = '';

    const socketCtx = useSocketContext();

    if (socketCtx.socket.connected == true) {
        socketCtx.socket.emit('roomID', (data) => {
            roomID = data;
            console.log(roomID);
        });
    }


    useEffect(() => {
        //socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;

            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);



    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Container>


            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container>
    );
};

export default Webcam; */