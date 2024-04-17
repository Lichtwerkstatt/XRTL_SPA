import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import { ThemeProvider, Button, IconButton, Typography } from '@mui/material';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import styles from '../CSS/HeaterCtrl.module.css';
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import Select from '../templates/Select';
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

    // List contains all possible selection options for the drop-down menu for setting the average time 
    const averageTimeList = {
        100: 100,
        500: 500,
        1000: 1000,
        2000: 2000
    }

    // List contains all possible selection options for the drop-down menu for setting the update time 
    const updateTimeList = {
        1000: 1,
        5000: 5,
        10000: 10
    }

    // Handles the change of the window size when clicking on the setting icon
    const hiddenSetting = () => {
        props.setSetting(!props.setting)

        if (props.setting) {
            document.getElementById('heaterSetting').style.left = '300px'
            document.getElementById('temp').style.left = '65px';
        } else {
            document.getElementById('heaterSetting').style.left = '620px';
            document.getElementById('temp').style.left = '225px';
        }
    }

    useEffect(() => {
        // Handles the window size when opening the component window.
        if (!props.setting) {
            document.getElementById('heaterSetting').style.left = '300px'
            document.getElementById('temp').style.left = '65px'
        } else {
            document.getElementById('heaterSetting').style.left = '620px';
            document.getElementById('temp').style.left = '225px';
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
        appCtx.toggleRoomComp(props.componentT, true);

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
            {/* Temperature display and the button for unfolding the settings */}
            <div className={styles.Temp}>
                <Typography id='temp' variant='h2'>{temp}</Typography>
                <IconButton id={'heaterSetting'} onClick={hiddenSetting}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>
            </div>

            {/* Left-hand setting section for the termistor */}
            <div className={styles.Canvas1}>
                <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                <Slider title='Power Value' component={props.component} online={onlineStatus} sliderValue={powerValue} min={0} max={255} option='pwm' />
            </div>

            {/* Switch for switching on the thermistor */}
            <div className={styles.Switch} >
                <Switch component={props.component} online={onlineStatus} switchStatus={powerSwitch} left='Off' right='On' option='switch' />
            </div>

            {/* Right side of the settings, which is only displayed if setting is true, making the component window larger */}
            {props.setting &&
                <div className={styles.Temp}>
                    <div className={styles.Canvas2}>
                        <Button sx={{ fontSize: 17, marginLeft: -34, marginTop: -4, marginBottom: 10 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                        <div className={styles.Select}>
                            <Select sx={{ zIndex: 1500, marginBottom: -10 }} title='Average time (ms)' component={props.componentT} online={onlineStatus} option='averageTime' selectValue={averageTime} list={averageTimeList} />
                            <Select title='Update time (s)' component={props.componentT} online={onlineStatus} option='updateTime' selectValue={updateTime} list={updateTimeList} />
                        </div>
                    </div>
                </div>
            }
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
