import { useSocketContext } from '../../services/SocketContext'
import { useRef, useEffect } from 'react';
import styles from "./Webcam.module.css";

const Webcam2 = () => {
    const socketCtx = useSocketContext();
    const tempSwitch = useRef();
    var peerConnection;
    const config = { iceServers: [{ urls: ["stun:stun.stunprotocol.org"] }] }


    socketCtx.socket.emit('viewer', 'Cam_1')//props.component)


    const view = () => {
        document.getElementById('video').setAttribute('style', 'display: true')
        socketCtx.socket.emit('viewer', 'Cam_1')//props.component)

        socketCtx.socket.on('offer', (payload) => {
            peerConnection = new RTCPeerConnection(config);

            peerConnection
                .setRemoteDescription(payload.data)
                .then(() => peerConnection.createAnswer())
                .then((sdp) => peerConnection.setLocalDescription(sdp))
                .then(() => socketCtx.socket.emit('answer', { id: payload.id, data: peerConnection.localDescription }))

            peerConnection.ontrack = (event) => {
                document.getElementById('video').srcObject = event.streams[0];
            }

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socketCtx.socket.emit('candidate', { id: payload.id, data: event.candidate })
                }
            }
        })

        socketCtx.socket.on('candidate', (payload) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(payload.data))
                .catch(e => console.error(e))
        })

        socketCtx.socket.on('disconnect peercon', () => {
            peerConnection.close();
        })
    }

    const disConnect = () => {
        socketCtx.socket.emit('watcher disconnect')
        peerConnection.close();
    }

    tempSwitch.current = view

    useEffect(() => {
        tempSwitch.current();
    }, [])

    return (
        <div className={styles.div}>
            <video className="video" id='video' autoPlay playsInline ></video>
        </div>
    );
};

export default Webcam2;