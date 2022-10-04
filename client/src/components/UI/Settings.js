import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../services/SocketContext";
import { useState, useRef, useEffect } from "react";
import Slider from "./SliderCtrl";
import Switch from "./Switch"
import Select from "./Select";
import UpDownCtrl from "./UpDownCtrl"
import LeftRightCtrl from "./LeftRightCtrl";
import Box from '@mui/material/Box';
import styles from "./Settings.module.css"

const Settings = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(false);
    var [mounted, setMounted] = useState(true);
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

    const settingEmit = () => {
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
            mounted = false;
            setMounted(false);
        }
        return () => {
            mounted = false;
            setMounted(false);
        }
    }
    settingCtrl.current = settingEmit;

    useEffect(() => {
        settingCtrl.current()
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.UpDown}>
                <UpDownCtrl component={props.component} online={onlineStatus} />
            </div>
            <div className={styles.LeftRight}>
                <LeftRightCtrl component={props.component} online={onlineStatus} />
            </div>
            <Box sx={{ m: 2, width: 250 }} > <h1>Settings</h1> </Box>
            <Select title="Resolution" component={props.component} online={onlineStatus} command="frame size" />
            <Switch component={props.component} command="gray" start='Color' end='Grey' online={true} option="val" />
            <Slider title="Contrast" component={props.component} command="contrast" min={-2} max={2} online={onlineStatus} option="val" />
            <Slider title="Brightness" component={props.component} command="brightness" min={-2} max={2} online={onlineStatus} option="val" />
        </ThemeProvider>
    )
}
export default Settings
