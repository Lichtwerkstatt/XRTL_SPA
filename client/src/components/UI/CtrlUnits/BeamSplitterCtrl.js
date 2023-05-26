import { useSocketContext } from '../../../services/SocketContext';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from 'react';
import Switch from '../templates/Switch';
import Box from '@mui/material/Box';

const BeamSplitterCtrl = (props) => {
    const [switchStatus, setSwitchStatus] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(true);

    const socketCtx = useSocketContext();

    useEffect(() => {
        const status = (payload) => {
            if (payload.controlId === props.component) {
                setOnlineStatus(true)
                payload.status.absolute === 90 ? setSwitchStatus(true) : setSwitchStatus(false)

                // console.log("Status  ", payload)
            }
        }

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on('status', status);

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ px: 1, pl: 2, pt: 2 }}>
                <Switch component={props.component} switchStatus={switchStatus} online={onlineStatus} start='Off' end='On' option='binaryCtrl' />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl