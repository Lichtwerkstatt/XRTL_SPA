import { useSocketContext } from '../../services/SocketContext'
import { useEffect } from 'react';
import styles from './CSS/ViewCam.module.css'

const ViewCam = (props) => {
    const socketCtx = useSocketContext();

    useEffect(() => {
        var peerConnection;

        const offer = (payload) => {
            peerConnection = props.peer;
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
        }

        const candidate = (payload) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(payload.data))
                .catch(e => console.error(e))
        }

        document.getElementById('video').setAttribute('style', 'transform: rotate(180deg)')

        socketCtx.socket.emit('viewer', props.component)

        socketCtx.socket.on('offer', offer)

        socketCtx.socket.on('candidate', candidate)

        return () => {
            socketCtx.socket.removeAllListeners('offer', offer)
            socketCtx.socket.removeAllListeners('candidate', candidate)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // width="640px" height="480px"
    return (
        <div className={styles.mainWrapper}>
            <video className="video" id='video' autoPlay playsInline ></video>
        </div>
    );
};
export default ViewCam;
