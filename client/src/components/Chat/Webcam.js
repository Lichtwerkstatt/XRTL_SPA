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
    var userList = [];
    var i = 0;

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
        width: window.innerWidth / 2,
    };

    useEffect(() => {
        if (socketCtx.socket.connected == true) {
            socketCtx.socket.emit('roomID', (data) => { //roomID wird übermittelt entspricht der ID erstellt durch uuid (konstant) bis zum nächsten Serverneustart
                roomID = data;

            });

            socketCtx.socket.emit('client list', (data) => { //übergibt die Userliste an den Client
                userList = data; //client Liste
                if (i == 0) {
                    userID = userList[0];
                    i++
                }
                //console.log(data);
            });
        }
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            console.log("Hier");
            userVideo.current.srcObject = stream;


            const peers = [];
            //console.log(socketCtx.socket.id)
            userList.forEach(userID => {
                const peer = createPeer(userID, roomID, stream);
                peersRef.current.push({
                    peerID: userID,
                    peer,
                })
                peers.push(peer);
                setPeers(peers);
            })



            socketCtx.socket.on('new user', (data) => {     //sendet an alle Clients bis uaf den senddenden CLient, dass ein neuer User gejoined ist & die aktualisierte Liste
                userID = data.id;
                userList = data.list;
                //console.log(userList);
                console.log("User connected: " + userID);

                socketCtx.socket.on("user joined", (payload) => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
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
        })

    }, []);

    function createPeer(userToSignal, callerID, stream) {       //Erstellen von peer des 1. joinenden Clienten
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,

        });

        peer.on("signal", signal => {
            socketCtx.socket.emit("sending signal", (userToSignal, callerID, signal))
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
            socketCtx.socket.emit("returning signal", { signal, callerID })
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
        <Container>
            <StyledVideo muted ref={userVideo} autoplay playsInline />
            {peers.map((peer, index) => {
                <Video key={index} peer={peer} />
            })}
        </Container>
    );

};

export default Webcam;