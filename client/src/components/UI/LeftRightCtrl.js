import { useSocketContext } from "../../services/SocketContext";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';

const LeftRightCtrl = (props) => {
    const socketCtx = useSocketContext();

    const handleCtrl = (direction, negativ) => (event) => {
        event.preventDefault();

        socketCtx.socket.emit("command", {
            userId: socketCtx.getNewUsername(),
            componentId: props.component,
            command: {
                controlId: direction,
                val: negativ ? 15 : -15
            }
        })
    }

    return (
        <Box>
            <IconButton onClick={handleCtrl("pan", false)}>
                <Left />
            </IconButton>
            <IconButton onClick={handleCtrl("pan", true)}>
                <Right />
            </IconButton>
        </Box>

    )

}

export default LeftRightCtrl;