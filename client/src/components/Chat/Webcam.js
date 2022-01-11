import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";

var Peer = require('simple-peer')
var roomID = '';
var currentUserID = '';
var lastJoinedUserID = '';

const Webcam = (props) => {
    const socketCtx = useSocketContext();
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    var userList = [];

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

    const videoConstraints = {
        height: 300,
        width: 300,
    };

    useEffect(() => {
        if (socketCtx.socket.connected == true) {
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                console.log("Hier");
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
                        const peer = addPeer(payload.signal, payload.currentUserID, stream);
                        peersRef.current.push({
                            peerID: payload.currentUserID,
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
    }, []);

    function createPeer(lastJoinedUserID, currentUserID, stream) {       //Erstellen von peer des 1. joinenden Clienten
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,

        });


        peer.on("signal", signal => {
            //console.log("signal");
            //console.log({ id: lastJoinedUserID, room: currentUserID, signal: signal });
            //socketCtx.socket.emit("sending signal", ({ id: lastJoinedUserID, room: currentUserID, signal: signal }));
        })
        return peer;
    }

    function addPeer(lastJoinedUserID, currentUserID, stream) {        //erstellt peers für alle folgenden joinenden Clienten 
        console.log("addPeer???");
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            //console.log("signalll 2");
            // socketCtx.socket.emit("returning signal", { signal: signal, room: currentUserID, id: currentUserID });
        });

        peer.signal(lastJoinedUserID);
        return peer;
    }

    return (
        <div>
            <video muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                <Video key={index} peer={peer} />
            })}
        </div>
    );

};
export default Webcam;