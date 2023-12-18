import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import styles from '../CSS/Settings.module.css'
import propTypes from "prop-types";
import { useEffect } from 'react';

/**
 * ESPCam canvas component
 * 
 * @description This component returns a canvas with the camera stream of an ESPCam. For this, the height and width 
 * must be specified. In addition, changes to the styling can be transferred.
 * 
 * @param {string} component - controlId 
 * @param {string} width - Sets the width of the canvas in pixels
 * @param {string} height - Sets the height of the canvas in pixels
 * @param {string} style - additional styling of the canvas
 * 
 * @returns {React.ReactElement} styled canvas with ESPCam stream
 */
const ESPCam = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    useEffect(() => {
        var x1, x2, y1, y2;
        var ctx;
        const data = (payload) => {
            if (payload.controlId === props.component) {
                var uint8Arr = new Uint8Array(payload.data);
                var binary = '';
                for (var i = 0; i < uint8Arr.length; i++) {
                    binary += String.fromCharCode(uint8Arr[i]);
                }
                var base64String = window.btoa(binary);

                var img = new Image();
                img.onload = function () {
                    var canvas = document.getElementById(props.component);

                    ctx = canvas.getContext('2d');
                    x1 = 0;
                    y1 = 0;
                    x2 = props.width;
                    y2 = props.height;
                    ctx.drawImage(this, x1, y1, x2, y2);
                };
                img.src = 'data:image/jpg;base64,' + base64String;
            }
        }
        // A room is created for the component, into which the clients are then added when they open the corresponding window. By creating the room, the traffic caused by sending the 
        // stream should be reduced, as only the clients who really need the stream receive it.
        appCtx.toogleRoomComp(props.component, true);

        socketCtx.socket.on('data', data);

        return () => {
            socketCtx.socket.removeAllListeners('data', data)
        }
        //Comment needed to prevent a warning
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <div className={styles.Canvas}>
            <canvas id={props.component} width={props.width+'px'} height={props.height+'px'} style={props.style} />
        </div>
    )
}

ESPCam.propTypes = {
    component: propTypes.string.isRequired,
    width: propTypes.string.isRequired,
    height: propTypes.string.isRequired,
    style: propTypes.object
}

export default ESPCam;

