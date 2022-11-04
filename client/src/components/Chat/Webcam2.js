import { useSocketContext } from '../../services/SocketContext'
import React, { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../services/AppContext";
import styles from "./Webcam.module.css";
var Peer = require('simple-peer');
var roomID = '';


const Webcam2 = () => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    var [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    const tempWebcam = useRef();


    function init() {
        const peer = createPeer();
        peer.addTransceiver("video", { direction: "recvonly" })
    }
    //

    function createPeer() {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

        return peer;
    }

    async function handleNegotiationNeededEvent(peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };

        socketCtx.socket.emit('consumer', payload);

        socketCtx.socket.on('consumer', payload => {
            const data = payload
            const desc = new RTCSessionDescription(data.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })


    }

    function handleTrackEvent(e) {
        document.getElementById("video").srcObject = e.streams[0];
    };
    /* }



    tempWebcam.current = webcamEmit;

    useEffect(() => {
        tempWebcam.current();
    }, [appCtx.showWebcam])
 */

    return (
        <div className={styles.webcamDiv}>
            <video autoplay id='video'></video>
            <button onClick={init}>Click me!</button>
        </div>
    );

};

export default Webcam2;