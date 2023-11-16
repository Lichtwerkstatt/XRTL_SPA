import { ThemeProvider, Button, IconButton, Typography } from '@mui/material';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import HeaterSettings from '../templates/HeaterSettings'
import styles from '../CSS/HeaterCtrl.module.css';
import { theme } from '../templates/Theme.js';
import Slider from '../templates/Slider';
import { useState, useEffect } from 'react';
import Switch from '../templates/Switch'

const HeaterCtrl = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const [onlineStatus, setOnlineStatus] = useState(false);
    const [powerSwitch, setPowerSwitch] = useState(false);
    const [averageTime, setAverageTime] = useState(0);
    const [updateTime, setUpdateTime] = useState(0);
    const [powerValue, setPowerValue] = useState(0);
    const [temp, setTemp] = useState('-°C');

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
        if (props.setting) {
            document.getElementById('smallTemp').style.display = 'none'
            document.getElementById('temp').style.display = 'block'
        } else {
            document.getElementById('smallTemp').style.display = 'block'
            document.getElementById('temp').style.display = 'none'
        }

      
        const status = (payload) => {
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

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.componentT,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>

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
export default HeaterCtrl;
