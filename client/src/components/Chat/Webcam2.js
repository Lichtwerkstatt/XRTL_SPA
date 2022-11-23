import { useSocketContext } from '../../services/SocketContext'
import { useRef, useEffect } from 'react';


const Webcam2 = (props) => {
    const socketCtx = useSocketContext();
    const tempSwitch = useRef();
    var peerConnection



    socketCtx.socket.emit('viewer', props.component)


    const view = () => {
        document.getElementById('video').setAttribute('style', 'display: true')
        socketCtx.socket.emit('viewer', props.component)

        socketCtx.socket.on('offer', (payload) => {
            peerConnection = props.peer;
            console.log(peerConnection)
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
    }

    tempSwitch.current = view

    useEffect(() => {
        tempSwitch.current();
    }, [])

    return (
        <div>
            <video className="video" id='video' autoPlay playsInline width="640px" height="480px" ></video>
        </div>
    );
};

export default Webcam2;