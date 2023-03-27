import { Box, ThemeProvider, Button, IconButton, Typography } from '@mui/material';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import styles from '../CSS/HeaterCtrl.module.css';
import { theme } from '../templates/Theme.js';
import Slider from '../templates/SliderCtrl';
import { useState, useEffect } from 'react';
import Switch from '../templates/Switch'
import Select from '../templates/Select'

const HeaterCtrl = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [powerSwitch, setPowerSwitch] = useState(false);
    const [powerValue, setPowerValue] = useState(0);
    const [setting, setSettings] = useState(true);
    const [temp, setTemp] = useState('-°C');

    const socketCtx = useSocketContext();

    const hiddenSetting = () => {
        setSettings(!setting);
    }
    
    useEffect(() => {
        const status = (payload) => {
            if (payload.controlId === props.component) {
                setOnlineStatus(true)
                setPowerSwitch(payload.status.isOn)
                setPowerValue(payload.status.pwm)

                console.log("Status  ", payload)
            }
        }

        const data = (payload) => {
            if (payload.controlId === props.componentT) {
                var string = payload.data.data;
                try { string = string.toFixed(1) + " °C" } catch (e) { string = '-°C' }
                setTemp(string);
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

    if (setting) {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.Temp}>
                    <Typography id='temp' variant='h2' >{temp}</Typography>
                    <IconButton onClick={hiddenSetting}  >
                        <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </div>
                <div className={styles.Canvas1}>
                    <canvas id='Gauge' />
                </div>
                <div className={styles.Heater} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                        <div style={{ paddingLeft: 10 }}>
                            <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                            <Slider title='PowerSwitch' component={props.component} led={props.led} online={onlineStatus} sliderValue={powerValue} min={0} max={255} option='pwm' />
                        </div>
                    </Box>
                </div>
                <div className={styles.Switch} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Switch component={props.component} led={props.led} online={onlineStatus} switchStatus={powerSwitch} start='Off' end='On' option='switch' />
                    </Box>
                </div>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.Temp}>
                    <Typography id='temp' variant='h2'>{temp}</Typography>
                    <IconButton onClick={hiddenSetting}  >
                        <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </div>
                <div className={styles.Canvas2}>
                    <canvas id='Heater' />
                </div>
                <div className={styles.Canvas1}>
                    <canvas id='Gauge' />
                </div>
                <div className={styles.Heater} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                        <div style={{ paddingLeft: 10 }}>
                            <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                            <Slider title='PowerSwitch' component={props.component} led={props.led} online={onlineStatus} sliderValue={powerValue} min={0} max={255} option='pwm' />
                        </div>
                        <div style={{ paddingLeft: 40 }}>
                            <Button sx={{ fontSize: 17 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                            <Select title='Average time (ms)' component={props.componentT} led={props.led} online={onlineStatus} option='averageTime' />
                            <Select title='Update time (s)' component={props.componentT} led={props.led} online={onlineStatus} option='updateTime' />
                        </div>
                    </Box>
                </div>
                <div className={styles.Switch} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Switch component={props.component} led={props.led} online={onlineStatus} switchStatus={powerSwitch} start='Off' end='On' option='switch' />
                    </Box>
                </div>
            </ThemeProvider>
        )
    }
}
export default HeaterCtrl;