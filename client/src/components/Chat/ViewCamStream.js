import { useSocketContext } from '../../services/SocketContext'
import { useEffect } from 'react';

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


        socketCtx.socket.emit("join stream room", {
            id: props.id,
            userId: socketCtx.username,
            controlId: 'Cam'
        });
       
        
          
          socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
          });

      
          socketCtx.socket.emit('getFooter', props.component);
      
        
          
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

    return (
        <div>
            <video className="video" id='video' autoPlay playsInline width="640px" height="480px" ></video>
        </div>
    );
};
export default ViewCam;
