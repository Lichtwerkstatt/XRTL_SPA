import { useSocketContext } from '../../../services/SocketContext';
import { useEffect } from 'react';
import ESPCam from '../templates/ESPCam';

const ESPCamWithoutSettings = (props) => {
    const socketCtx = useSocketContext();

    useEffect(() => {
        document.getElementById(props.component).style.transform = 'rotate(180deg)'

        const status = (payload) => {
            if (payload.controlId === props.component) {
                //console.log('Status of settings:   ', payload)
            }
        }

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on('status', status);

        return () => {
            socketCtx.socket.removeAllListeners('status', status)

        }
        //Comment needed to prevent a warning
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <ESPCam component={props.component} width={props.width} height={props.height} style={{ borderRadius: '5px', backgroundSize: 'cover', top: 30 }} />
    )
    //<canvas id='Canvas' width={props.width} height={props.height} style={{ borderRadius: '5px', backgroundSize: 'cover' }} />
}
export default ESPCamWithoutSettings;