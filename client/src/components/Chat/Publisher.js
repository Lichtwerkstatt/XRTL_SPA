
import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import { useState, useEffect, useRef } from "react";

const Publisher = () => {
    const [switchStatus, setSwitchStatus] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const socketCtx = useSocketContext();
    const tempSwitch = useRef();
    const appCtx = useAppContext();
  

    async function init() {
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

        
        socketCtx.socket.emit('broadcast', payload);
        
        socketCtx.socket.on('broadcast', payload => {
            const data  = payload;
            const desc = new RTCSessionDescription(data.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })
    }
    
    

    return (
        <div >
            <video autoplay id='video'></video>
            <button onClick={init}>Start stream!</button>
        </div>
    );

};

export default Publisher;