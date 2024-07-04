import { useSocketContext } from '../../../services/SocketContext';
import ESPCam from '../templates/ESPCam';
import propTypes from "prop-types";
import { useEffect } from 'react';

/**
 * ESPCam component without settings
 * 
 * @description This component returns a canvas with the camera stream of an ESPCam. For this, the height and width of the window must be transferred 
 * and the controlId with which the ESP is to be addressed.
 * 
 * @param {string} component - controlId 
 * @param {string} width - Transfers the width to ESPCam class 
 * @param {string} height - Transfer the height to ESPCam class 
 * 
 * @returns {React.ReactElement} styled canvas with ESPCam stream
 */
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
        <ESPCam component={props.component} width={props.width} height={props.height} style={{  border: '0px', borderRadius: '5px', backgroundSize: '', top: 15, bottom: '0px', right: '0px', left: '0px', width: "100%", height: '100%' }} />
    )
}

ESPCamWithoutSettings.propTypes = {
    component: propTypes.string.isRequired,
    width: propTypes.string.isRequired,
    height: propTypes.string.isRequired,
}

export default ESPCamWithoutSettings;