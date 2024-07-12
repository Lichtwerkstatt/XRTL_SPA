import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import { ThemeProvider } from '@mui/material/styles';
import ESPCam from '../templates/ESPCam';
import styles from '../CSS/Settings.module.css'
import { theme, themeSettings } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import Slider from '../templates/Slider';
import Switch from '../templates/Switch';
import Select from '../templates/Select';
import Box from '@mui/material/Box';
import propTypes from "prop-types";

/**
 * ESPCam component with settings
 * 
 * @description This component returns a canvas with the camera stream of an ESPCam and the corresponding setting options. For this, the controlId with which the ESP is to be addressed must be transferred. 
 * In addition, the variables setting and setSetting must be passed. These handle the change of the window size when folding 
 * and unfolding the settings.
 * 
 * @param {string} component - controlId 
 * @param {boolean} setting - If true, then setting options are hidden, if false then they are displayed and the component window is larger.
 * @param {func} setSetting - To change the setting variable value 
 * 
 * @returns {React.ReactElement} styled canvas with ESPCam stream and setting options
 */
const ESPCamPlusSettings = (props) => {
    const [switchIsOn, setSwitchStatus] = useState(false);
    const [online, setOnlineStatus] = useState(false);
    const [frameSize, setFrameSize] = useState(10);
    const [contrast, setContrast] = useState(0);
    const [exposure, setExposure] = useState(0);

    const isMobile = window.innerWidth <= 992;

    const socketCtx = useSocketContext();

    const resolution = {
        5: 'QVGA (320x240)',
        8: 'VGA (640x480)',
        9: 'SVGA (800x600)',
        10: 'XGA (1024x768)',
    }

    
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Handles the change of the window size when clicking on the setting icon
    const hiddenSetting = () => {
        props.setSetting(!props.setting)

        if (!isMobile) {
            document.getElementById(props.component).style.left = props.setting ? '-325px' : '-655px';
        }
        else {
            document.getElementById(props.component).style.left = props.setting ? '-25px' : '-355px';
        }
    }

    useEffect(() => {
        // Handles the window size when opening the component window.
        if (!isMobile) {
            document.getElementById(props.component).style.left = !props.setting ? '-325px' : '-655px';
        }
        else {
            document.getElementById(props.component).style.left = !props.setting ? '-25px' : '-355px';
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

    useEffect(() => {
        let newWidth = window.innerWidth;
        let newHeight = window.innerHeight;
    
        if (isMobile) {
          newWidth = 300;
          newHeight = 230;
        } else {
          newWidth = 600;
          newHeight = 400;
        }
    
        setDimensions({ width: newWidth, height: newHeight });
      }, [isMobile]);

    return (
        <ThemeProvider theme={themeSettings}>
            <div className={styles.Settings}>
                <IconButton onClick={hiddenSetting}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>
                <ESPCam component={props.component} width={dimensions.width} height={dimensions.height} style={{ border: '2px solid #01bd7d', borderRadius: '15px', top: '15px' }} />
                {props.setting && (
                    <div className={styles.SettingsContainer}>
                        {isMobile ? (
                            <>
                            <Select title='Resolution' component={props.component} online={online} option='frameSize' selectValue={frameSize} list={resolution} style={{padding:0}}/>
                            <Switch component={props.component} switchStatus={switchIsOn} online={online} left='Color' right='Gray' option='gray' />
                            <Slider title='Contrast' component={props.component} online={online} sliderValue={contrast} min={-2} max={2} option='contrast' />
                            <Slider title='Exposure' component={props.component} online={online} sliderValue={exposure} min={0} max={1200} option='exposure' />
                            </>
                        ) : (
                            <>
                            <Box sx={{ m: 2, width: 250 }} > <h1>Settings</h1> </Box>
                            <Select title='Resolution' component={props.component} online={online} option='frameSize' selectValue={frameSize} list={resolution} />
                            <Switch component={props.component} switchStatus={switchIsOn} online={online} left='Color' right='Gray' option='gray' />
                            <Slider title='Contrast' component={props.component} online={online} sliderValue={contrast} min={-2} max={2} option='contrast' />
                            <Slider title='Exposure' component={props.component} online={online} sliderValue={exposure} min={0} max={1200} option='exposure' />
                            </>
                        )}
                    </div>
                )}
            </div>
        </ThemeProvider>
    )
}

ESPCamPlusSettings.propTypes = {
    component: propTypes.string.isRequired,
    setting: propTypes.bool.isRequired,
    setSetting: propTypes.func.isRequired
}

export default ESPCamPlusSettings;