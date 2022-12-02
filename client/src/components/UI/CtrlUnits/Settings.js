import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { useState, useRef, useEffect } from "react";
import LeftRightCtrl from "../templates/LeftRightCtrl";
import styles from "../CSS/Settings.module.css"
import UpDownCtrl from "../templates/UpDownCtrl"
import Box from '@mui/material/Box';
import Slider from "../templates/SliderCtrl";
import Switch from "../templates/Switch"
import Select from "../templates/Select";

const Settings = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(true);
    var [mounted, setMounted] = useState(false);
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

            socketCtx.socket.emit('getFooter', props.component)

            socketCtx.socket.on('getFooter', payload => {
                if (payload.componentId === props.component) {
                    setOnlineStatus(true)
                    props.newStatus(String(payload.status))
                }
                socketCtx.socket.off('getFooter')
            });

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
