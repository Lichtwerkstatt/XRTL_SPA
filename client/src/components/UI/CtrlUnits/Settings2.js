import { useSocketContext } from '../../../services/SocketContext';
import { ThemeProvider } from '@mui/material/styles';
import styles from '../CSS/Settings.module.css'
import { theme } from '../templates/Theme.js';
import { useEffect } from 'react';

const Settings = (props) => {
    const socketCtx = useSocketContext();

    useEffect(() => {
        var x1, x2, y1, y2;
        var ctx;

        if (props.width === '700px') {
            document.getElementById('Canvas').style.left = '-340px'
            document.getElementById('Canvas').style.transform = 'rotate(180deg)'
        }

        const status = (payload) => {
            if (payload.controlId === props.component) {
                //console.log('Status of settings:   ', payload)
            }
        }

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
                    var canvas = document.getElementById('Canvas');

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

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit('join stream room', {
            controlId: props.component,
            userId: socketCtx.username
        });

        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on('status', status);

        socketCtx.socket.on('data', data);

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
            socketCtx.socket.removeAllListeners('data', data)
        }
        //Comment needed to prevent a warning
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.Settings}>

                <div className={styles.Canvas}>
                    <canvas id='Canvas' width={'600px'} height={'400px'} />
                </div>

            </div>
        </ThemeProvider>
    )
}
export default Settings;