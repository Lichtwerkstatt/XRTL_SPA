import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect } from "react";
var Peer = require('simple-peer')
var roomID = '';

const Webcam = (props) => {
    const socketCtx = useSocketContext();
    const webcamElement =document.getElementById("videostream");
    

    if (socketCtx.socket.connected == true) {
        socketCtx.socket.emit('roomID', (data) => {
            roomID = data;
            console.log(roomID);
        });


        socketCtx.socket.emit('join-room', roomID)
        socketCtx.socket.on('user-connected', (userID) => {     //sendet an alle außerdem dem sendenden Client die Nachriht, dass xy connected hat
            console.log("User connected: " + userID);
        });

        const constraints ={
            audio: true,
            video:{
                width: 400, height: 300
            }
        }
    
        async function init(){
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                handleSuccess(stream);
            } catch (e) {
                //errorMsgElement.innerHTML = 'navigator.mediaDevices.getUserMedia.error:${e.toString()}'
                
            }
        }
    
        function handleSuccess(stream){
            window.stream=stream 
            webcamElement.srcObject = stream 
        }
        init()


        /* navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(gotMedia).catch(() => { })

        function gotMedia(stream) {
            var peer1 = new Peer({ initiator: true, stream: stream })
            var peer2 = new Peer()

            console.log(peer2)

            peer1.on('signal', data => {
                peer2.signal(data)
            })

            peer2.on('signal', data => {
                peer1.signal(data)
            })

            peer2.on('stream', stream => {
                // got remote video stream, now let's show it in a video tag
                var video = document.querySelector('video')

                if ('srcObject' in video) {
                    video.srcObject = stream
                } else {
                    video.src = window.URL.createObjectURL(stream) // for older browsers
                }

                video.play()
            }) 
        } */
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