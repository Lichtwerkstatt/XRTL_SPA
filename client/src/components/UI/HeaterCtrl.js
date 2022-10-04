import { useState, useEffect, useRef } from "react";
import { useSocketContext } from "../../services/SocketContext";
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Slider from './SliderCtrl'
import Switch from './Switch'
import Select from './Select'
import { Box, createTheme, ThemeProvider, Button, IconButton, Typography } from '@mui/material';
import styles from "./HeaterCtrl.module.css";

const HeaterCtrl = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [setting, setSettings] = useState(true);
    var [mounted, setMounted] = useState(true);
    const [temp, setTemp] = useState('-°C')
    const socketCtx = useSocketContext();
    const settingCtrl = useRef();

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
    const heaterEmit = () => {
        if (!mounted) {
            mounted = true
            setMounted(true)

            socketCtx.socket.emit("command", {
                userId: socketCtx.username,
                componentId: props.component,
                command: "getStatus"
            })

            socketCtx.socket.on("status", payload => {
                if (payload.componentId === props.component) {
                    console.log("Status of settings:   ", payload)
                }
            });

            socketCtx.socket.on('footer', payload => {
                if (payload.componentId === props.component) {
                    props.newStatus(String(payload.status))
                }
            })

            socketCtx.socket.emit('getFooter', props.component)

            socketCtx.socket.on('getFooter', payload => {
                if (payload.componentId === props.component) {
                    setOnlineStatus(payload.online)
                    props.newStatus(String(payload.status))
                }
            });

            socketCtx.socket.on("data", (payload) => {
                setTemp(payload.data.data);
            });

            mounted = false;
            setMounted(false);
        }
        return () => {
            mounted = false;
            setMounted(false);
        }
    }
    settingCtrl.current = heaterEmit;

    useEffect(() => {
        settingCtrl.current()
    }, [socketCtx.socket]);

    if (setting) {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.Temp}>
                    <Typography variant="h2">{temp}</Typography>
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
                            <Slider title="Power" component={props.component} command="output" min={0} max={255} online={onlineStatus} option='power' />
                        </div>
                    </Box>
                </div>
                <div className={styles.Switch} >
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Switch component={props.component} command="output" start='Off' end='On' online={onlineStatus} option="stream" />
                    </Box>
                </div>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.Temp}>
                    <Typography variant="h2">{temp}</Typography>
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
                            <Slider title="Power" component={props.component} command="output" min={0} max={255} online={onlineStatus} option='power' />
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
                        <Switch component={props.component} command="output" start='Off' end='On' online={onlineStatus} option="stream" />
                        <Switch component={props.component} command="thermistor" start='Off' end='On' online={onlineStatus} option="val" />
                    </Box>
                </div>
            </ThemeProvider>
        )
    }
}

export default HeaterCtrl;