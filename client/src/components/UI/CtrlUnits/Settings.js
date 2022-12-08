import { useSocketContext } from "../../../services/SocketContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LeftRightCtrl from "../templates/LeftRightCtrl";
import styles from "../CSS/Settings.module.css"
import UpDownCtrl from "../templates/UpDownCtrl"
import Slider from "../templates/SliderCtrl";
import { useState, useEffect } from "react";
import Switch from "../templates/Switch"
import Select from "../templates/Select";
import Box from '@mui/material/Box';

const Settings = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(true);
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

    useEffect(() => {
        const status = (payload) => {
            if (payload.componentId === props.component) {
                console.log("Status of settings:   ", payload)
            }
        }

        const footer = (payload) => {
            if (payload.componentId === props.component) {
                props.newStatus(String(payload.status))
            }
        }

        const getFooter = (payload) => {
            if (payload.componentId === props.component) {
                setOnlineStatus(true)
                props.newStatus(String(payload.status))
            }
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

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
            socketCtx.socket.removeAllListeners('footer', footer)
            socketCtx.socket.removeAllListeners('getFooter', getFooter)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
