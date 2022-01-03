import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";
import {Container, Row} from 'react-bootstrap';
var Peer = require('simple-peer')
var roomID = '';

const Webcam = (props) => {
    const socketCtx = useSocketContext();
    const webcamElement = document.getElementById("videostream");
    const [stream, setStream] = useState();
    const userVideo = useRef();
    const partnerVideo = useRef();
    const partnerVideo2 = useRef();
    let PartnerVideo;
    let PartnerVideo2;
    let UserVideo;
    var otheruser = true;



    if (socketCtx.socket.connected == true) {
        socketCtx.socket.emit('roomID', (data) => {
            roomID = data;
            console.log(roomID);
        });


        socketCtx.socket.emit('join-room', roomID)
        socketCtx.socket.on('user-connected', (userID) => {     //sendet an alle außerdem dem sendenden Client die Nachriht, dass xy connected hat
            console.log("User connected: " + userID);
            otheruser = true;
            console.log(otheruser);
        });

        if (otheruser== true){
            partnerVideo.current.srcObject = stream;
            partnerVideo2.current.srcObject = stream;
        }



        /* 
                const constraints = {
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
                        //errorMsgElement.innerHTML = 'navigator.mediaDevices.getUserMedia.error:${e.toString()}'
        
                    }
                }
        
                function handleSuccess(stream) {
                    window.stream = stream
                    webcamElement.srcObject = stream
                }
        
                const clone_Webcam_Div = function () {
                    init();
                    console.log("Hier");
                    let w1 = document.getElementById('web2')
                    let t = document.querySelector('.webcamDiv');
        
                    w1.appendChild(t.cloneNode(true));
                    console.log("erstellt?");
        
                }
                clone_Webcam_Div();
         */
    }
    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })
    }, []);



    UserVideo = (
        <video playsInline muted ref={userVideo} autoPlay />
    );

    if (otheruser == true) {
        PartnerVideo = (
            <video playsInline ref={partnerVideo} autoPlay />
        );
        PartnerVideo2 = (
            <video playsInline ref={partnerVideo2} autoPlay />
        );

    }









    return (
        <div>
            <Container>
            <Row>
                {UserVideo}
                {PartnerVideo}
                {PartnerVideo2}
            </Row>
            </Container>


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