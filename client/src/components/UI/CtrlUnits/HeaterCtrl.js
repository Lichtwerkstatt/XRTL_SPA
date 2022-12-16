import { useState, useEffect } from "react";
import { useSocketContext } from "../../../services/SocketContext";
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Slider from '../templates/SliderCtrl'
import Switch from '../templates/Switch'
import Select from '../templates/Select'
import { Box, createTheme, ThemeProvider, Button, IconButton, Typography } from '@mui/material';
import styles from "../CSS/HeaterCtrl.module.css";

const HeaterCtrl = (props) => {
    const [powerSwitch, setPowerSwitch] = useState(false);
    const [powerValue, setPowerValue] = useState(0);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [setting, setSettings] = useState(true);
    const [temp, setTemp] = useState('-°C')
    const socketCtx = useSocketContext();

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#01bd7d',
                main: '#01bd7d',
                dark: '#01bd7d',
                contrastText: '#01bd7d',
            },
        }
    })

    const hiddenSetting = () => {
        setSettings(!setting);
    }
    useEffect(() => {
        const status = (payload) => {
            if (payload.componentId === props.component) {
                setPowerSwitch(payload.status.output.isOn)
                setPowerValue(payload.status.output.pwm)
            }
        }

        const footer = (payload) => {
            if (payload.componentId === props.component) {
                props.newStatus(String(payload.status))
            }
        }

        const getFooter = (payload) => {
            if (payload.componentId === props.component) {
                setOnlineStatus(payload.online)
                props.newStatus(String(payload.status))
            }
        }

        const data = (payload) => {
            var string = payload.data.data.data;
            try{string = String(string.toFixed(2)) + " °C"} catch(e){string='-°C'}
            setTemp(string);
        }

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: "getStatus"
        })
        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on("status", status);

        socketCtx.socket.on('footer', footer)

        socketCtx.socket.on('getFooter', getFooter);

        socketCtx.socket.on("data", data);

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
            socketCtx.socket.removeAllListeners('footer', footer)
            socketCtx.socket.removeAllListeners('getFooter', getFooter)
            socketCtx.socket.removeAllListeners('data', data)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    if (setting) {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.Temp}>
                    <Typography variant="h2" value={temp}></Typography>
                    <IconButton onClick={hiddenSetting}  >
                        <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </div>
                <div className={styles.Canvas1}>
                    <canvas id="Gauge" />
                </div>
                <div className={styles.Heater} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                        <div style={{ paddingLeft: 10 }}>
                            <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                            <Slider title="PowerSwitch" component={props.component} command="output" min={0} max={255} online={onlineStatus} option='pwm' sliderValue ={powerValue}/>
                        </div>
                    </Box>
                </div>
                <div className={styles.Switch} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Switch component={props.component} command="output" start='Off' end='On' online={onlineStatus} option="val" switchStatus={powerSwitch}/>
                    </Box>
                </div>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.Temp}>
                    <Typography variant="h2" value ={temp}></Typography>
                    <IconButton onClick={hiddenSetting}  >
                        <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </div>
                <div className={styles.Canvas2}>
                    <canvas id="Heater" />
                </div>
                <div className={styles.Canvas1}>
                    <canvas id="Gauge" />
                </div>
                <div className={styles.Heater} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                        <div style={{ paddingLeft: 10 }}>
                            <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                            <Slider title="PowerSwitch" component={props.component} command="output" min={0} max={255} online={onlineStatus} option='pwm' />
                        </div>
                        <div style={{ paddingLeft: 20 }}>
                            <Button sx={{ fontSize: 17 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                            <Select title="Average time (ms)" component={props.component} online={onlineStatus} command="thermistor" option="averageTime" />
                            <Select title="Update time (s)" component={props.component} online={onlineStatus} command="thermistor" option="updateTime" />
                        </div>
                    </Box>
                </div>
                <div className={styles.Switch} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Switch component={props.component} command="thermistor" start='Off' end='On' online={onlineStatus} option="val" switchStatus={powerSwitch}/>
                    </Box>
                </div>
            </ThemeProvider>
        )
    }
}
export default HeaterCtrl;