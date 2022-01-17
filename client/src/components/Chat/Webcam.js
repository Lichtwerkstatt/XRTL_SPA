import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../services/AppContext";
import styled from "styled-components";
var Peer = require('simple-peer')
var roomID = '';
var currentUserID = '';
var lastJoinedUserID = '';

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

const Webcam = () => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    var userList = [];

    const videoConstraints = {
        height: window.innerHeight / 2,
        width: window.innerWidth / 2
    };

    useEffect(() => {
        if (appCtx.showWebcam) {
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
                socketCtx.socket.emit('roomID', (data) => { //roomID wird übermittelt entspricht der ID erstellt durch uuid (konstant) bis zum nächsten Serverneustart
                    roomID = data;
                });

                socketCtx.socket.emit('client list', (data) => { //übergibt die Userliste an den Client
                    userList = data; //client Liste
                    //console.log(userList);
                    currentUserID = userList[userList.length - 1];
                    const peers = [];
                    userList.forEach(lastJoinedUserID => {
                        if (lastJoinedUserID !== currentUserID) {    //erstelle die Peers von allen Usern außer uns selbst
                            const peer = createPeer(lastJoinedUserID, currentUserID, stream);
                            peersRef.current.push({
                                peerID: lastJoinedUserID,
                                peer,
                            });
                            peers.push(peer);
                        } else {
                            lastJoinedUserID = currentUserID;       //setze die eigene ID
                        }
                    })
                    setPeers(peers);
                });

                socketCtx.socket.on('new user', (data) => {     //sendet an alle Clients bis uaf den senddenden CLient, dass ein neuer User gejoined ist & die aktualisierte Liste
                    lastJoinedUserID = data.id;
                    userList = data.list;
                    //console.log("User connected: " + lastJoinedUserID);

                    socketCtx.socket.on("user joined", (payload) => {
                        console.log("user joined??")
                        const peer = addPeer(payload.signal, payload.callerID, stream);
                        peersRef.current.push({
                            peerID: payload.callerID,
                            peer,
                        });

                        setPeers(user => [...user, peer]);
                        console.log("Peers 2");
                        console.log(peers);
                    });
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
            //console.log("signal");
            //console.log({ id: lastJoinedUserID, room: currentUserID, signal: signal });
            socketCtx.socket.emit("sending signal", ({ userToSignal, callerID, signal }));
        })
        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {        //erstellt peers für alle folgenden joinenden Clienten 
        console.log("addPeer???");
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            //console.log("signalll 2");
            socketCtx.socket.emit("returning signal", { signal, callerID });  //hier stimmt irgendwas noch nicht ganz
        });
        console.log(peers.map);
        peer.signal(incomingSignal);
        return peer;
    }
    if (appCtx.showWebcam) {
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
    }
    else {
        return <></>;
    }
};

export default Webcam;