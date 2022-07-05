import { useSocketContext } from "../../services/SocketContext";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';

const LeftRightCtrl = (props) => {
    const socketCtx = useSocketContext();

    const handleCtrl = direction => (event) => {
        event.preventDefault();
        console.log(socketCtx)
        socketCtx.socket.emit("command", {
            userId: socketCtx.getNewUsername(),
            componentId: props.component,
            command: {
                controlId: direction,
                val: 15
            }
        })
    }

    return (
        <Box>
            <IconButton onClick={handleCtrl("left")}>
                <Left />
            </IconButton>
            <IconButton onClick={handleCtrl("right")}>
                <Right />
            </IconButton>
        </Box>

    )

}

export default LeftRightCtrl;