import React, { useRef, useEffect } from "react";


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
    const socket = io.connect("http://localhost:7000", { auth: { token: token } });


    const tempSwitch = useRef();
    const webcamEmit = async () => {
        console.log("hier")
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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


        socket.emit('broadcast', payload);

        socket.on('broadcast', payload => {
            const desc = new RTCSessionDescription(payload.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })

        console.log(peer)
    }

    tempSwitch.current = webcamEmit

    useEffect(() => {
        tempSwitch.current();
    }, [socket])


    return (
        <div >
            <video id='video' autoPlay playsInline></video>
        </div>
    );


};

export default Webcam;