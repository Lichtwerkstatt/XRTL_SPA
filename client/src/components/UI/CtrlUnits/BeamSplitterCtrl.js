import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Switch from "../templates/Switch";


const BeamSplitterCtrl = (props) => {
    const [onlineStatus, setOnlineStatus] = useState(true);
    const [switchStatus, setSwitchStatus] = useState(false);

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
                setSwitchStatus(payload.status['laser'])
            }
        }

        const footer = (payload) => {
            if (payload.componentId === props.component) {
                props.newStatus(String(payload.status))
            }
        }

        const getFooter = (payload) => {
            if (payload.componentId === props.component) {
                setOnlineStatus(!payload.online)
                props.newStatus(String(payload.status))
            }
        }

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: "getStatus"
        })

        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on("status", status)

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
                <Switch component={props.component} command="beamSplitter" start='Off' end='On' checked={switchStatus} online={onlineStatus} option="binaryCtrl" />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl
