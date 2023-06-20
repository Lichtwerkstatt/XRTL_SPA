import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from  '../../../services/AppContext';
import ESPCamSettings from '../templates/ESPCamSettings';
import { ThemeProvider } from '@mui/material/styles';
import styles from '../CSS/Settings.module.css'
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';

const Settings = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [switchIsOn, setSwitchStatus] = useState(false);
    const [frameSize, setFrameSize] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [exposure, setExposure] = useState(0);
    
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const hiddenSetting = () => {
        props.setSetting(!props.setting)

        if (props.setting) {
            document.getElementById('ScreenCanvas').style.left = '-325px'
        } else {
            document.getElementById('ScreenCanvas').style.left = '-655px'
        }
    }

    useEffect(() => {
        var x1, x2, y1, y2;
        var ctx;

        if (!props.setting && !props.mobile) {
            document.getElementById('ScreenCanvas').style.left = '-325px'
        } else if (!props.mobile) {
            document.getElementById('ScreenCanvas').style.left = '-655px'
        }

        const status = (payload) => {
            if (payload.controlId === props.component) {
                setOnlineStatus(true)
                setSwitchStatus(payload.status.gray)
                setExposure(payload.status.exposure)
                setContrast(payload.status.contrast)
                setFrameSize(payload.status.frameSize)
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

        appCtx.toogleRoomComp(props.component, true);

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
                <IconButton onClick={hiddenSetting}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>
                <div className={styles.Canvas}>
                    <canvas id='ScreenCanvas' width={'600px'} height={'400px'} />
                </div>
                {props.setting && <ESPCamSettings component={props.component} online={onlineStatus} contrast={contrast} exposure={exposure} switchIsOn={switchIsOn} frameSize={frameSize} />}
            </div>
        </ThemeProvider>
    )
}
export default Settings;