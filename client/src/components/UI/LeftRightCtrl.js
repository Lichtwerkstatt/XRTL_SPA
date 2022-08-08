import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from "react";

const LeftRightCtrl = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [onlineStatus, setOnlineStatus] = useState('');
    const [mouted, setMounted] = useState(true);
    const [footer, setFooter] = useState(props.footer);

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

        socketCtx.socket.emit('getFooter', props.component)

        socketCtx.socket.on('getFooter', payload => {
            if (payload.componentId === props.component) {
           // setFooter(payload.status)
            setOnlineStatus(payload.online)
            if (mouted) { props.newStatus(String(payload.status)) }
            }
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User changed the position on " + props.component)

        return () => setMounted(false)
    }

    return (
        <Box>
            <IconButton onClick={handleCtrl("pan", false)} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && onlineStatus) ? false : true}  >
                <Left />
            </IconButton>
            <IconButton onClick={handleCtrl("pan", true)} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && onlineStatus) ? false : true}  >
                <Right />
            </IconButton>
        </Box>
    )
}

export default LeftRightCtrl;