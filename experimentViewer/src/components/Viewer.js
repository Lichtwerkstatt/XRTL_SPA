import React, { useRef, useEffect } from "react";
import styles from "./Webcam.module.css";

const Video = () => {
    var jwt = require('jsonwebtoken');
    var payload = {
        sub: 'webcam',
        component: 'client',
        iat: Date.now(),
        exp: Date.now() + 3600000,
    }
    var token = jwt.sign(payload, "keysecret");
    const io = require("socket.io-client");
    const socket = io.connect("http://localhost:7000", { auth: { token: token } });
    const tempSwitch = useRef();
    var peerConnection;
    const config = { iceServers: [{ urls: ["stun:stun.stunprotocol.org"] }] }

    const handleViewer = () => {
        socket.emit('viewer', 'Cam_1')//props.component)
    }

    const view = () => {
        socket.on('offer', (payload) => {
            peerConnection = new RTCPeerConnection(config);

            peerConnection
                .setRemoteDescription(payload.data)
                .then(() => peerConnection.createAnswer())
                .then((sdp) => peerConnection.setLocalDescription(sdp))
                .then(() => socket.emit('answer', { id: payload.id, data: peerConnection.localDescription }))

            peerConnection.ontrack = (event) => {
                document.getElementById('video').srcObject = event.streams[0];
            }

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('candidate', { id: payload.id, data: event.candidate })
                }
            }
        })

        socket.on('candidate', (payload) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(payload.data))
                .catch(e => console.error(e))
        })

        socket.on('disconnect peercon', () => {
            peerConnection.close();
        })
    }

    tempSwitch.current = view

    useEffect(() => {
        tempSwitch.current();
    }, [])

    return (
        <div className={styles.webcamDiv}>
            <button onClick={handleViewer}>Click me</button>
            <video className="video" id='video' autoPlay playsInline ></video>
        </div>
    );
};

export default Video;