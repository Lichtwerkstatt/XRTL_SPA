
import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import { useState, useEffect, useRef } from "react";

const Publisher = () => {
    const [switchStatus, setSwitchStatus] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const socketCtx = useSocketContext();
    const tempSwitch = useRef();

    const appCtx = useAppContext();
    const webcamEmit = () => {
        console.log("hier")
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            
            document.getElementById("video").srcObject = stream;
            const peer = createPeer();
            stream.getTracks().forEach(track => peer.addTrack(track, stream));

        })
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


        socketCtx.socket.emit('broadcast', payload);

        socketCtx.socket.on('broadcast', payload => {
            const desc = new RTCSessionDescription(payload.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })
    }

    tempSwitch.current = webcamEmit

    useEffect(() => {
        tempSwitch.current();
    }, [socketCtx.socket])


    return (
        <div >
            <video id='video' autoPlay playsInline></video>
        </div>
    );

};

export default Publisher;