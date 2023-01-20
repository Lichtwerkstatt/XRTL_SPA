import { useSocketContext } from '../../../services/SocketContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Slider from '../templates/SliderCtrl';
import Box from '@mui/material/Box';

const BeamSplitterCtrl = (props) => {
    const [switchIsOn, setSwitchStatus] = useState(false);
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
                setSwitchStatus(payload.status)
            }
        }

        const footer = (payload) => {
            if (payload.controlId === props.component) {
                props.newStatus(String(payload.status))
            }
        }

        const getFooter = (payload) => {
            if (payload.controlId === props.component) {
                setOnlineStatus(!payload.online)
                props.newStatus(String(payload.status))
            }
        }

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on('status', status)

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
                <Slider title="Beam Options"  component={props.component} led={props.led} switchStatus={switchIsOn} online={onlineStatus} sliderValue={contrast} min={-2} max={2}   option='binaryCtrl' />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl
