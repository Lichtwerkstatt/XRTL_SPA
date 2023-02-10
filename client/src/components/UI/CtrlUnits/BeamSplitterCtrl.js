import { useSocketContext } from "../../../services/SocketContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

        const footer = (payload) => {
            if (payload.controlId === props.component) {
                props.newStatus(String(payload.status))
            }
        }

        const getFooter = (payload) => {
            if (payload.controlId === props.component) {

                setOnlineStatus(payload.online)
                props.newStatus(String(payload.status))
            }
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

        socketCtx.socket.emit('getFooter', props.component);
        socketCtx.socket.emit('getFooter', props.pinhole);
        socketCtx.socket.emit('getFooter', props.redLED)
        socketCtx.socket.emit('getFooter', props.whiteLED)



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
            <Box sx={{ mx: 1 }}>
                <RadioButton component={props.component} component2={props.pinhole} online={onlineStatus} val={selectionStatus} led={props.led} option="moveTo" option2="binaryCtrl" />
                <Switch component={props.whiteLED} led={props.led} switchStatus={switchWhiteIsOn} online={onlineStatus} start='LED white Off' end='On' option='switch' />
                <Switch component={props.redLED} led={props.led} switchStatus={switchRedIsOn} online={onlineStatus} start='LED red Off' end='On' option='switch' />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl
