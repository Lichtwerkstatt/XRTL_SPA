import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from "../templates/SliderCtrl";


const BeamSplitterCtrl = (props) => {
    const marks = [{ value: 0, label: 'None', }, { value: 1, label: 'Glas', }, { value: 2, label: 'Laser', },];
    const [onlineStatus, setOnlineStatus] = useState(true);
    var [mounted, setMounted] = useState(false);
    const socketCtx = useSocketContext();
    const settingCtrl = useRef();

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

    const settingEmit = () => {
        if (!mounted) {
            mounted = true
            setMounted(true)

            socketCtx.socket.emit("command", {
                userId: socketCtx.username,
                componentId: props.component,
                command: "getStatus"
            })

            socketCtx.socket.emit('getFooter', props.component)

            socketCtx.socket.on('getFooter', payload => {
                if (payload.componentId === props.component) {
                    setOnlineStatus(props.online)
                    props.newStatus(String(payload.status))
                }
                socketCtx.socket.off('getFooter')
            });

            socketCtx.socket.on("status", payload => {
                if (payload.componentId === props.component) {
                    console.log("Status of settings:   ", payload)
                }
            });

            socketCtx.socket.on('footer', payload => {
                if (payload.componentId === props.component) {
                    props.newStatus(String(payload.status))
                }
            })
            mounted = false;
            setMounted(false);
        }
        return () => {
            mounted = false;
            setMounted(false);
        }
    }
    settingCtrl.current = settingEmit;

    useEffect(() => {
        settingCtrl.current()
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mx: 1 }}>
                <Slider title="Glas option" component={props.component} min={0} max={2} command="glas" text={marks} online={onlineStatus} option="pos" />
            </Box>
        </ThemeProvider>
    )
}
export default BeamSplitterCtrl
