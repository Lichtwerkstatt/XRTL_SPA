import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap';
import styled from "styled-components";

var Peer = require('simple-peer')
var roomID = '';
var userID = '';

const Webcam = (props) => {
    const socketCtx = useSocketContext();
    //const [stream, setStream] = useState();
    // const userVideo = useRef();
    // const partnerVideo = useRef();
    // const partnerVideo2 = useRef();
    /* let PartnerVideo;
    let PartnerVideo2;
    let UserVideo;
    var otheruser = true; */

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    var joinRoom = false;
    var userList = [];

    const videoConstraints = {
        height: window.innerHeight / 2,
        width: window.innerWidth / 2,
    };

    useEffect(() => {
        if (socketCtx.socket.connected == true) {
            socketCtx.socket.emit('roomID', (data) => { //roomID wird übermittelt entspricht der ID erstellt durch uuid (konstant) bis zum nächsten Serverneustart
                roomID = data;
            });

            socketCtx.socket.emit('client list', (data) => { //übergibt die Userliste an den Client
                userList = data; //client Liste
                //console.log(data);
            });


            socketCtx.socket.on('user joined', (data) => {     //sendet an alle Clients bis uaf den senddenden CLient, dass ein neuer User gejoined ist & die aktualisierte Liste
                userID = data.id;
                userList = data.list;
                //console.log(userList);
                console.log("User connected: " + userID);
            });

        }
    })
    //     useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
    //             //userVideo.current.srcObject = stream;

    //           /*   socketCtx.socket.emit('user joined', (data) => {
    //                 userID = data;
    //                 console.log("New User conected with userID " + userID);
    //             }) */


    //             socketCtx.socket.on('user-connected', (users) => {     //sendet an alle außerdem dem sendenden Client die Nachricht, dass xy connected hat
    //                 console.log("User connected: " + userID);           //brauchen statt userId das komplette Array


    //                 const peers = [];

    //                 /*    users.array.forEach(userID => {
    //                        const peer = createPeer(userID, socketRef.current.id, stream);
    //                        peersRef.current.push({
    //                            peerID: userID,
    //                            peer,
    //                        })
    //                        peers.push(peer);
    //                        setPeers(peers);
    //                    }); */
    //             });

    //         }, []);
    //     }
    // })

    function createPeer(userToSignal, callerId, stream) {       //Erstellen von peer des 1. joinenden Clienten
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,

        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal"(userToSignal))
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {        //erstellt peers für alle folgenden joinenden Clienten 
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



    /*         if (otheruser == true) {
                partnerVideo.current.srcObject = stream;
                partnerVideo2.current.srcObject = stream;
            }
     
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
     
        } */


    {/* <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container> */}
    return (
        <div>
            <h1>hha</h1>

        </div>
    );

};

export default Webcam;