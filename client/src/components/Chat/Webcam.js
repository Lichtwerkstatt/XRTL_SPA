import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

var Peer = require('simple-peer')
var roomID = '';
var userID = '';

const Webcam = (props) => {
    const socketCtx = useSocketContext();
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    var userList = [];
    var i = 0;
    var stream;


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


            //stream.stop()

            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                console.log("Hier");
                userVideo.current.srcObject = stream;
                socketCtx.socket.emit('roomID', (data) => { //roomID wird übermittelt entspricht der ID erstellt durch uuid (konstant) bis zum nächsten Serverneustart
                    roomID = data;

                });

                socketCtx.socket.emit('client list', (data) => { //übergibt die Userliste an den Client
                    userList = data; //client Liste
                    if (i == 0) {
                        userID = userList[0];
                        i++
                    }

                    const peers = [];

                    userList.forEach(userList => {
                        const peer = createPeer(userID, roomID, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
                        peers.push(peer);
                        setPeers(peers);
                    })
                    console.log(peers);
                });

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
                    console.log("Peers 2" + peers);

                    socketCtx.socket.on("receiving returned signal", payload => {
                        const item = peersRef.current.find(p => p.peerID === payload.id);
                        item.peer.signal(payload.signal);
                    });

                })
            })
        }
        
       
      
    }, []);
    useEffect(() => {
        if(socketCtx.socket.connected == false && stream){
            console.log("fall2");
            stream.getTracks().forEach(function(track) {
                track.stop();
              });
        }
       
    }, [])

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