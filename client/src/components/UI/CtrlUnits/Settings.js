import { useSocketContext } from "../../../services/SocketContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
/*import LeftRightCtrl from "../templates/LeftRightCtrl";
 import styles from "../CSS/Settings.module.css"
import UpDownCtrl from "../templates/UpDownCtrl" */
import Slider from "../templates/SliderCtrl";
import { useState, useEffect } from "react";
import Switch from "../templates/Switch"
//import Select from "../templates/Select";
import Box from '@mui/material/Box';

const Settings = (props) => {
    const [switchIsOn, setSwitchStatus] = useState(false);
    const [contrast, setContrast] = useState(0);
    const [exposure, setExposure] = useState(0);
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
            if (payload.controlId === props.component) {
                setSwitchStatus(payload.status.gray)
                setExposure(payload.status.exposure)
                setContrast(payload.status.contrast)
                //console.log("Status of settings:   ", payload)
            }
        }

        const footer = (payload) => {
            if (payload.controlId === props.component) {
                props.newStatus(String(payload.status))
            }
        }

        const getFooter = (payload) => {
            if (payload.controlId === props.component) {
                setOnlineStatus(true)
                props.newStatus(String(payload.status))
            }
        }

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
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
            {/* <div className={styles.UpDown}>
                <UpDownCtrl component={props.component} online={onlineStatus} option='virtualTilt' />
            </div>
            <div className={styles.LeftRight}>
                <LeftRightCtrl component={props.component} online={onlineStatus} option='virtualPan' />
            </div> */}
            <Box sx={{ m: 2, width: 250 }} > <h1>Settings</h1> </Box>
            {/*  <Select title="Resolution" component={props.component} online={onlineStatus} option="frameSize" /> */}
            <Switch component={props.component} switchStatus={switchIsOn} online={onlineStatus} start='Color' end='Gray' option="gray" />
            <Slider title="Contrast" component={props.component} online={onlineStatus} sliderValue={contrast} min={-2} max={2} option="contrast" />
            <Slider title="Exposure" component={props.component} online={onlineStatus} sliderValue={exposure} min={0} max={500} option="exposure" />
        </ThemeProvider>
    )
}
export default Settings
