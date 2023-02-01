import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from "../templates/SliderCtrl";
import Switch from '../templates/Switch';


const BeamSplitterCtrl = (props) => {
    const marks = [{ value: 14, label: 'Pinhole', }, { value: 41, label: 'White LED', }, { value: 65, label: 'Red LED', }, { value: 80, label: 'None', }, { value: 115, label: 'Beam splitter', }];
    const [onlineStatus, setOnlineStatus] = useState(true);
    const [switchRedIsOn, setSwitchRedStatus] = useState(false);
    const [switchWhiteIsOn, setSwitchWhiteStatus] = useState(false);
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
                setSwitchWhiteStatus(payload.isOn);
                setSwitchRedStatus(payload.isOn);
                console.log("Status of settings:   ", payload)
            }
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
            <Box sx={{ mx: 1 }}>
                <Slider  component={props.component} online={onlineStatus} led={props.led} min={14} max={117} text={marks} option="moveTo" />
                <Switch component={props.component} led={props.led} switchStatus={switchWhiteIsOn} online={onlineStatus} start='LED white Off' end='On' option='binaryCtrl' />
                <Switch component={props.component} led={props.led} switchStatus={switchRedIsOn} online={onlineStatus} start='LED red Off' end='On' option='binaryCtrl' />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl
