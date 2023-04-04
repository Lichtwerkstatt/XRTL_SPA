import { useSocketContext } from '../../../services/SocketContext';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ThemeProvider } from '@mui/material/styles';
import styles from '../CSS/Settings.module.css'
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import ESPCamSettings from '../templates/ESPCamSettings';

const Settings = (props) => {
    const [switchIsOn, setSwitchStatus] = useState(false);
    const [contrast, setContrast] = useState(0);
    const [exposure, setExposure] = useState(0);
    const [onlineStatus, setOnlineStatus] = useState(true);
    const [settings, setSettings] = useState(true);
    const socketCtx = useSocketContext();

    const hiddenSetting = () => {
        setSettings(!settings);
        if (settings) {
            document.getElementById('ScreenCanvas').style.height = '400px'
            document.getElementById('ScreenCanvas').style.width = '800px'
        } else {

            document.getElementById('ScreenCanvas').style.height = '400px'
            document.getElementById('ScreenCanvas').style.width = '600px'
        }
    }

    useEffect(() => {
        const status = (payload) => {
            if (payload.controlId === props.component) {
                setOnlineStatus(true)
                setSwitchStatus(payload.status.gray)
                setExposure(payload.status.exposure)
                setContrast(payload.status.contrast)
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
                    var canvas = document.getElementById('ScreenCanvas');
                    if (canvas != null) {
                        var ctx = canvas.getContext('2d');
                        var x1 = 0,
                            y1 = 0,
                            x2 = 300,
                            y2 = 200;
                        ctx.drawImage(this, x1, y1, x2, y2);
                    }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.Settings}>
                <IconButton onClick={hiddenSetting}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>

                <div className={styles.Canvas}>
                    <canvas id='ScreenCanvas' width={'600px'} height={'400px'} />
                </div>

                {settings && <ESPCamSettings component={props.component} online={onlineStatus} constrast={contrast} exposure={exposure} switchIsOn={switchIsOn} />}
            </div>

            <div className={styles.circle} />

        </ThemeProvider>
    )
}
export default Settings;