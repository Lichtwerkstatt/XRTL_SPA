//TODO: 
//* Stream immer übertragen und nicht nur manchmal --> Stabi garantieren
//* socket.on, wenn stream starten soll --> erstellen der Peer Connection 
//* Viwer erhält stream
//* wenn Viewer Fenster schließt oder disconnected, dann überprüfen, ob noch jemand in dem Raum ist (wenn nicht Strema beenden)
//* wenn kein Stream verfügbar Bild oder text einblenden
//* Stream unabhängig machne --> uf raspberry
//* testen, ob das auf Raspberry funktioniert
//* 
import React, { useRef, useEffect, useState } from "react";


const Webcam = () => {
    var jwt = require('jsonwebtoken');
    var payload = {
        sub: 'webcam',
        component: 'client',
        iat: Date.now(),
        exp: Date.now() + 3600000,
    }
    var token = jwt.sign(payload, "keysecret");
    const io = require("socket.io-client");


    const [peerConnections, setPeerConnections] = useState({});
    const videoRef = useRef();

    const tempSwitch = useRef();
    const tempSwitch2 = useRef();


    const webcamEmit = async () => {
        const socket = io.connect("http://localhost:7000", { auth: { token: token }, autoConnect: true });
        const contraints = { audio: false, video: { facingMode: "user" } };
        const config = { iceServers: [{ urls: ["stun:stun.stunprotocol.org"] }] };
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("video").srcObject = stream;


        socket.emit('broadcaster join', 'Cam_1')

        socket.on('viewer', viewerId => {
            const peerConnection = new RTCPeerConnection(config);
            peerConnections[viewerId] = peerConnection;

            setPeerConnections(peerConnections[viewerId] = peerConnection);
            let stream = document.getElementById("video").srcObject;
            console.log(stream)
            stream
                .getTracks()
                .forEach(track => peerConnection.addTrack(track, stream));

            console.log(peerConnection)
            peerConnection.onicecandidate = (event) => {

                if (event.candidate) {

                    socket.emit('candidate', { id: viewerId, data: event.candidate });
                }
            }

            peerConnection
                .createOffer()
                .then((sdp) => peerConnection.setLocalDescription(sdp))
                .then(() => {

                    console.log(viewerId)
                    const data =
                        socket.emit('offer', { id: viewerId, data: peerConnection.localDescription })
                });


        })

        socket.on('answer', (payload) => {
            peerConnections[payload.id].setRemoteDescription(payload.data);
        });

        socket.on('candidate', (payload) => {
            peerConnections[payload.id].addIceCandidate(new RTCIceCandidate(payload.data))
        })

    }










    /* socket.emit('broadcaster join', 'Cam_1')
     
     
     
    const webcamEmit = async () => {
        console.log("hier")
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("video").srcObject = stream;
        const peer = createPeer();
        stream.getTracks().forEach(track => peer.addTrack(track, stream));
     
     
    }
     
     function createPeer() {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
     
        return peer;
    }
     
    async function handleNegotiationNeededEvent(peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };
        socket.on('Livestream start',() => {
      
            
        })
        socket.emit('broadcast', payload);
     
        socket.on('broadcast', payload => {
            const desc = new RTCSessionDescription(payload.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })
        
        console.log(peer) 
    }
     
    tempSwitch.current = peerConn
    
    useEffect(() => {
        tempSwitch.current();
    }, [])
    */
    tempSwitch2.current = webcamEmit

    useEffect(() => {
        tempSwitch2.current();
    }, [])

    return (
        <div >

            <video id='video' autoPlay playsInline ref={videoRef}></video>
        </div>
    );


};

export default Webcam;