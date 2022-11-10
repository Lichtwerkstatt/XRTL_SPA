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

    async function init() {
        const peer = createPeer();
        peer.addTransceiver("video", { direction: "recvonly" })
    }

    function createPeer() {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: ["stun:stun.stunprotocol.org"]
                }
            ]
        });
        const remoteVideo = document.querySelector('video');

        peer.ontrack = async event => {
            const [remoteStream]= event.streams;
            console.log(event)
            remoteVideo.srcObject = remoteStream
            console.log(remoteStream)

        }
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

        return peer;
    }

    async function handleNegotiationNeededEvent(peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const data = {
            sdp: peer.localDescription
        };

        socket.emit('consumer', data);

        socket.on('consumer', payload => {
            console.log("consumer answer")
            const desc = new RTCSessionDescription(payload.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })


    }


    tempSwitch.current = init

    useEffect(() => {
        tempSwitch.current();
    }, [socket]) 




    return (
        <div className={styles.webcamDiv}>
            <video id='video' autoPlay playsInline></video>
        </div>
    );

};

export default Video;