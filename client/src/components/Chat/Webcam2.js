import { useSocketContext } from '../../services/SocketContext'
import { useRef, useEffect } from 'react';

const Webcam2 = () => {
    const socketCtx = useSocketContext();
    const tempSwitch = useRef();

    function init() {
  //        socketCtx.socket.emit('Livestream start')
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

        const video = document.querySelector('video')
        peer.ontrack = event => {
            const [remoteStream] = event.streams;
            video.srcObject = remoteStream;
            video.autoPlay = true;
            video.playsInline = true;
            video.muted = true;

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
        <div  >
            <video id='video' autoPlay playsInline></video>
        </div>
    );

};

export default Webcam2;