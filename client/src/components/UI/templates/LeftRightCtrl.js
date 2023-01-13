import Right from '@mui/icons-material/ArrowCircleRightOutlined';
import { useSocketContext } from "../../../services/SocketContext";
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useAppContext } from "../../../services/AppContext";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const LeftRightCtrl = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const handleCtrl = (direction, negativ) => (event) => {
        event.preventDefault();
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: negativ ? 15 : -15
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User changed the position on " + props.component)
    }

    return (
        <Box>
            <IconButton onClick={handleCtrl("virtualPan", false)} disabled={(socketCtx.connected && props.online) ? false : true}  >
                <Left />
            </IconButton>
            <IconButton onClick={handleCtrl("virtualPan", true)} disabled={(socketCtx.connected && props.online) ? false : true}  >
                <Right />
            </IconButton>
        </Box>
    )
}

export default LeftRightCtrl;