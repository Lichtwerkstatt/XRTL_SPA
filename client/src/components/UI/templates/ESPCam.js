import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import styles from '../CSS/Settings.module.css'
import { useEffect } from 'react';

const ESPCamSettings = (props) => {
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
                    x2 = 600;
                    y2 = 400;
                    ctx.drawImage(this, x1, y1, x2, y2);
                };
                img.src = 'data:image/jpg;base64,' + base64String;
            }
        }
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
            <canvas id={props.component} width={props.width} height={props.height} style={props.style} />
        </div>
    )
}
export default ESPCamSettings;