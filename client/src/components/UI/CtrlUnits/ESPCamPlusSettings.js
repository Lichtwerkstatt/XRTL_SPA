import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import { ThemeProvider } from '@mui/material/styles';
import ESPCam from '../templates/ESPCam';
import styles from '../CSS/Settings.module.css'
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import Slider from '../templates/Slider';
import Switch from '../templates/Switch';
import Select from '../templates/Select';
import Box from '@mui/material/Box';

const ESPCamPlusSettings = (props) => {
    const [switchIsOn, setSwitchStatus] = useState(false);
    const [online, setOnlineStatus] = useState(false);
    const [frameSize, setFrameSize] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [exposure, setExposure] = useState(0);

    const socketCtx = useSocketContext();

    const resolution = {
        5: 'QVGA (320x240)',
        8: 'VGA (640x480)',
        9: 'SVGA (800x600)',
        10: 'XGA (1024x768)',
    }

    const hiddenSetting = () => {
        props.setSetting(!props.setting)

        if (props.setting) {
            document.getElementById(props.component).style.left = '-325px'
        } else {
            document.getElementById(props.component).style.left = '-655px'
        }
    }

    useEffect(() => {
        if (!props.setting && !props.mobile) {
            document.getElementById(props.component).style.left = '-325px'
        } else if (!props.mobile) {
            document.getElementById(props.component).style.left = '-655px'
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
        <ThemeProvider theme={theme}>
            <div className={styles.Settings}>
                <IconButton onClick={hiddenSetting}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>
                <ESPCam component={props.component} width={'600px'} height={'400px'} />
                {props.setting &&

                    <div className={styles.Settings}>
                        <Box sx={{ m: 2, width: 250 }} > <h1>Settings</h1> </Box>
                        <Select title='Resolution' component={props.component} online={online} option='frameSize' selectValue={frameSize} list={resolution} />
                        <Switch component={props.component} switchStatus={switchIsOn} online={online} left='Color' right='Gray' option='gray' />
                        <Slider title='Contrast' component={props.component} online={online} sliderValue={contrast} min={-2} max={2} option='contrast' />
                        <Slider title='Exposure' component={props.component} online={online} sliderValue={exposure} min={0} max={1200} option='exposure' />
                    </div>

                }
            </div>
        </ThemeProvider>
    )
}
export default ESPCamPlusSettings;