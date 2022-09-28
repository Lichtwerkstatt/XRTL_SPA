import { useState } from "react";
import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import SpeedIcon from '@mui/icons-material/Speed';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import Slider from './SliderCtrl'
import Select from './Select'
import Switch from './Switch'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "./HeaterCtrl.module.css";
import IconButton from '@mui/material/IconButton';

const HeaterCtrl = (props) => {
    const [switchStatus, setSwitchStatus] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

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

    const handleCtrl = (direction, negativ) => (event) => {
        event.preventDefault();
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: {
                controlId: direction,
                val: negativ ? 15 : -15
            }
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User changed the position on " + props.component)
    }

    return (
        <ThemeProvider theme={theme}>

            <div className={styles.Temp}>
                <canvas text="hdhdh">

                </canvas>
                <IconButton onClick={handleCtrl("virtualPan", false)}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>

            </div>
            <div className={styles.Switch} >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus}  online={onlineStatus} />
                    <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus}  online={onlineStatus} />
                </Box>
            </div>
            <div className={styles.Heater} >

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                    <div style={{ paddingLeft: 10 }}>
                        <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                        <Slider title="Power" component={props.component} command="brightness" min='0' max='255' online={onlineStatus} />
                    </div>
                    <div style={{ paddingLeft: 15 }}>
                        <Button sx={{ fontSize: 17 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                        <Select title="Average time (ms)" component={props.component} online={onlineStatus} command="frame size" />
                        <Select title="Update time (s)" component={props.component} online={onlineStatus} command="frame size" />
                    </div>
                </Box>
                <div className={styles.Canvas2}>
                    <canvas id="Heater" />
                </div>
                <div className={styles.Canvas1}>
                    <canvas id="Gauge" />
                </div>

            </div>
        </ThemeProvider>
    )
}

export default HeaterCtrl;