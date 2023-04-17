import { useSocketContext } from "../../../services/SocketContext";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../templates/Theme.js'
import RadioButton from '../templates/RadioButton';
import { useState, useEffect } from "react";
import Switch from '../templates/Switch';
import Box from '@mui/material/Box';

const BeamSplitterCtrl = (props) => {
    const [switchWhiteIsOn, setSwitchWhiteStatus] = useState(false);
    const [switchRedIsOn, setSwitchRedStatus] = useState(false);
    const [selectionStatus, setSelectionStatus] = useState(80);
    const [onlineStatus, setOnlineStatus] = useState(false);

    const socketCtx = useSocketContext();

    useEffect(() => {
        const status = (payload) => {
            setOnlineStatus(true)
            if (payload.controlId === props.redLED) {
                setSwitchRedStatus(payload.status.isOn);
            }
            else if (payload.controlId === props.whiteLED) {
                setSwitchWhiteStatus(payload.status.isOn);
            }
            else if (payload.controlId === 'experimentSelection') {
                (payload.status.busy) ? setOnlineStatus(false) : setOnlineStatus(true);
                setSelectionStatus(payload.status.absolute)
            }
            //console.log("Status of settings:   ", payload)
        }

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.pinhole,
            getStatus: true
        })

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.redLED,
            getStatus: true
        })

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.whiteLED,
            getStatus: true
        })

        socketCtx.socket.emit('getFooter', props.component)

        return () => {
            socketCtx.socket.removeAllListeners('status', status)

        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mx: 1 }}>
                <RadioButton component={props.component} component2={props.pinhole} online={onlineStatus} val={selectionStatus} option="state" />
                <Switch component={props.whiteLED} switchStatus={switchWhiteIsOn} online={onlineStatus} start='LED white Off' end='On' option='switch' />
                <Switch component={props.redLED} switchStatus={switchRedIsOn} online={onlineStatus} start='LED red Off' end='On' option='switch' />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl
