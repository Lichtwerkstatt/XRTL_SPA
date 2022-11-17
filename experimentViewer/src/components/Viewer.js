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
    console.log("verbindung steht")

    const config = {
        iceServer: [{ urls: ["stun:stun.stunprotocol.org"] }]
    }

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
                console.log(event);
                document.getElementById('video').srcObject = event.stream[0];
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

    }



    /* 
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
    
            const videoStream = document.querySelector('video')
            peer.ontrack = async event => {
                const [remoteStream] = event.streams;
                videoStream.srcObject = remoteStream;
                videoStream.autoPlay = true;
                videoStream.playsInline = true;
                videoStream.muted = true;
                console.log(videoStream.srcObject)
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
    
    */
    tempSwitch.current = view

    useEffect(() => {
        tempSwitch.current();
    }, [socket])

    return (
        <div className={styles.webcamDiv}>
            <button onClick={handleViewer}>Click me</button>
            <video className="video" id='video' autoPlay playsInline ></video>
        </div>
    );

};

export default Video;