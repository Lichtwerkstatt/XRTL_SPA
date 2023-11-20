import { ThemeProvider, Button, IconButton, Typography } from '@mui/material';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import HeaterSettings from '../templates/HeaterSettings';
import styles from '../CSS/HeaterCtrl.module.css';
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import Slider from '../templates/Slider';
import Switch from '../templates/Switch';
import propTypes from "prop-types";

/**
 * HeaterCtrl component
 * 
 * @description The React component contains the currently transmitted temperature of the heater as well as various setting options, both for the heater and for the thermistor.
 * 
 * @param {string} component - controlId of the heater
 * @param {string} componentT - controlId of the thermistor
 * @param {boolean} setting - If true, then setting options are hidden, if false then they are displayed and the component window is larger.
 * @param {func} setSetting - To change the setting variable value 
 * 
 * @returns {React.ReactElement} HeaterCtrl control element
 */
const HeaterCtrl = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [powerSwitch, setPowerSwitch] = useState(false);
    const [averageTime, setAverageTime] = useState(100);
    const [updateTime, setUpdateTime] = useState(1000);
    const [powerValue, setPowerValue] = useState(0);
    const [temp, setTemp] = useState('-°C');

    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    // Handles the change of the window size when clicking on the setting icon
    const hiddenSetting = () => {
        props.setSetting(!props.setting)

        if (props.setting) {
            document.getElementById('smallTemp').style.display = 'block'
            document.getElementById('temp').style.display = 'none'
        } else {
            document.getElementById('smallTemp').style.display = 'none'
            document.getElementById('temp').style.display = 'block'
        }
    }

    useEffect(() => {
        // Handles the window size when opening the component window.
        if (props.setting) {
            document.getElementById('smallTemp').style.display = 'none'
            document.getElementById('temp').style.display = 'block'
        } else {
            document.getElementById('smallTemp').style.display = 'block'
            document.getElementById('temp').style.display = 'none'
        }

        const status = (payload) => {
            // Setting the status depending on the different controlIds.
            if (payload.controlId === props.component) {
                setOnlineStatus(true)
                setPowerSwitch(payload.status.isOn)
                setPowerValue(payload.status.pwm)
                // console.log("Status  ", payload)
            }

            if (payload.controlId === props.componentT) {
                setAverageTime(payload.status.averageTime);
                setUpdateTime(payload.status.updateTime);
                // console.log("Status  Thermistor", payload)
            }
        }

        // When the temperature is received in the form of the data event, it is shortened by decimal places and displayed in the component window.
        const data = (payload) => {
            if (payload.controlId === props.componentT) {
                var string = payload.data.data;
                try { string = string.toFixed(1) + " °C" } catch (e) { string = '-°C' }
                setTemp(string);
            }
        }

        // Sending server commands to request the status of all components
        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.componentT,
            getStatus: true
        })

        // A room is created for the component, into which the clients are then added when they open the corresponding window. By creating the room, the traffic caused by sending the 
        // stream should be reduced, as only the clients who really need the stream receive it.
        appCtx.toogleRoomComp(props.component, true);

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
            {/* Full size window */}
            <div id={'temp'} style={{ display: 'none' }}>
                <div className={styles.Temp}>
                    <Typography id='temp' variant='h2'>{temp}</Typography>
                    <IconButton onClick={hiddenSetting}  >
                        <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </div>
                <div className={styles.Canvas1}>
                    <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                    <Slider title='PowerSwitch' component={props.component} online={onlineStatus} sliderValue={powerValue} min={0} max={255} option='pwm' />
                </div>

                <div className={styles.Switch} >
                    <Switch component={props.component} online={onlineStatus} switchStatus={powerSwitch} start='Off' end='On' option='switch' />
                </div>
                <HeaterSettings online={true} component={props.componentT} updateTime={updateTime} averageTime={averageTime} />
            </div>

            {/* Small format window */}
            <div id={'smallTemp'} >
                <div className={styles.TempSmall}>
                    <Typography id='temp' variant='h2'>{temp}</Typography>
                    <IconButton onClick={hiddenSetting}  >
                        <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </div>

                <div className={styles.Canvas1}>
                    <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                    <Slider title='PowerSwitch' component={props.component} online={onlineStatus} sliderValue={powerValue} min={0} max={255} option='pwm' />
                </div>

                <div className={styles.SwitchTemp} >
                    <Switch component={props.component} online={onlineStatus} switchStatus={powerSwitch} start='Off' end='On' option='switch' />
                </div>

            </div>

        </ThemeProvider>
    )
}

HeaterCtrl.propTypes = {
    component: propTypes.string.isRequired,
    componentT: propTypes.string.isRequired,
    setting: propTypes.bool.isRequired,
    setSetting: propTypes.func.isRequired
}

export default HeaterCtrl;
