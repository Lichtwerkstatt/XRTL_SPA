import React, { useRef, useEffect, useState } from "react";

const Webcam = () => {
    var jwt = require('jsonwebtoken');
    var payload = {
        sub: 'webcam',
        component: 'component',
        iat: Date.now(),
        exp: Date.now() + 1800000,
    }
    var token = jwt.sign(payload, "keysecret");
    const io = require("socket.io-client");

    const [peerConnections, setPeerConnections] = useState({});
    const videoRef = useRef();

    useEffect(() => {
        const webcamEmit = async () => {
            const socket = io.connect("http://10.232.37.40:7000", { auth: { token: token }, autoConnect: true });
            const contraints = { audio: false, video: { facingMode: "user", width: 640, height: 480 }, };
            const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] }
            const stream = await navigator.mediaDevices.getUserMedia(contraints);

            const viewer = (viewerId) => {
                const peerConnection = new RTCPeerConnection(config);
                peerConnections[viewerId] = peerConnection;

                setPeerConnections(peerConnections[viewerId] = peerConnection);
                let stream = document.getElementById("video").srcObject;

                stream
                    .getTracks()
                    .forEach(track => peerConnection.addTrack(track, stream));

                peerConnection.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('candidate', { id: viewerId, data: event.candidate });
                    }
                }

                peerConnection
                    .createOffer()
                    .then((sdp) => peerConnection.setLocalDescription(sdp))
                    .then(() => {
                        socket.emit('offer', { id: viewerId, data: peerConnection.localDescription })
                    });
            }

            const answer = (payload) => {
                try { peerConnections[payload.id].setRemoteDescription(payload.data); }
                catch (e) {
                    console.error("Remote answer is in stable state stable!")
                }
            }

            const candidate = (payload) => {
                peerConnections[payload.id].addIceCandidate(new RTCIceCandidate(payload.data))
            }

            const disconnect = (id) => {
                delete peerConnections[id]
            }

            document.getElementById("video").srcObject = stream;

            socket.emit('broadcaster join', 'Cam_1')

            socket.on('viewer', viewer)

            socket.on('answer', answer);

            socket.on('candidate', candidate)

            socket.on('disconnect peerConnection', disconnect)

            return () => {
                socket.removeAllListeners('viewer', viewer)
                socket.removeAllListeners('answer', answer)
                socket.removeAllListeners('candidate', candidate)
                socket.removeAllListeners('disconnect peerConnection', disconnect)
            }
        }

        webcamEmit() //function call

    }, [])

    return (
        <div >
            <video id='video' autoPlay playsInline ref={videoRef}></video>
        </div>
    );
};
export default Webcam;