import { useState } from "react";
import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Slider from './SliderCtrl'
import Select from './Select'
import Switch from './Switch'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "./HeaterCtrl.module.css";

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
            <div className={styles.Heater} >

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', m: 4, p: 2 }}>
                    <div>
                        <h3>Header settings</h3>
                        <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus} icon={document.getElementById("icon")} online={onlineStatus} />
                        <Slider title="Power" component={props.component} command="brightness" min='0' max='255' online={onlineStatus} />

                    </div>
                    <div>
                        <h3>Gauge settings</h3>
                        <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus} icon={document.getElementById("icon")} online={onlineStatus} />
                        <Select title="Average time (ms)" component={props.component} online={onlineStatus} command="frame size" />
                        <Select title="Update time (s)" component={props.component} online={onlineStatus} command="frame size" />

                    </div>
                </Box>
                <Box>
                    
                </Box>
            </div>


        </ThemeProvider>
        /*         <Box>
                    <IconButton onClick={handleCtrl("virtualPan", false)} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true}  >
                        <Left />
                    </IconButton>
                    <IconButton onClick={handleCtrl("virtualPan", true)} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true}  >
                        <Right />
                    </IconButton>
                </Box> */
    )
}

export default HeaterCtrl;