import { useSocketContext } from '../../services/SocketContext'
import styles from "./Webcam.module.css";
import { useRef, useEffect } from 'react';

const Webcam2 = () => {
    const socketCtx = useSocketContext();
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

        peer.ontrack = event => {
            console.log(event)
            document.getElementById("video").srcObject = event.streams[0];
            console.log(document.getElementById("video"))

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

        socketCtx.socket.emit('consumer', data);

        socketCtx.socket.on('consumer', payload => {
            console.log("consumer answer")
            const desc = new RTCSessionDescription(payload.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })


    }


    tempSwitch.current = init

    useEffect(() => {
        tempSwitch.current();
    }, [socketCtx.socket])




    return (
        <div className={styles.webcamDiv}>
            <video id='video' autoPlay playsInline></video>
        </div>
    );

};

export default Webcam2;