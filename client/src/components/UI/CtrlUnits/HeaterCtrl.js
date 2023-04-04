import { useSocketContext } from '../../../services/SocketContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Switch from '../templates/Switch';
import Box from '@mui/material/Box';

const BeamSplitterCtrl = (props) => {
    const [switchStatus, setSwitchStatus] = useState(false);
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
                setOnlineStatus(true)
                setPowerSwitch(payload.status.isOn)
                setPowerValue(payload.status.pwm)

                console.log("Status  ", payload)
            }
        }

        const data = (payload) => {
            if (payload.controlId === props.componentT) {
                var string = payload.data.data;
                try { string = string.toFixed(1) + " °C" } catch (e) { string = '-°C' }
                setTemp(string);
            }
        }
        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit('join stream room', {
            controlId: props.component,
            userId: socketCtx.username
        });


        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on('status', status);

        socketCtx.socket.on('data', data);

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
            socketCtx.socket.removeAllListeners('data', data)
            socketCtx.socket.removeAllListeners('footer', footer)
            socketCtx.socket.removeAllListeners('getFooter', getFooter)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mx: 1 }}>
                <Switch component={props.component} checked={switchStatus} online={onlineStatus} start='Off' end='On' option='switch' />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl