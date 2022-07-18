import { useSocketContext } from "../../services/SocketContext";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';


const UpDownCtrl = (props) => {
  const socketCtx = useSocketContext();

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
  }

  return (
    <Stack>
      <IconButton onClick={handleCtrl("tilt", true)}>
        <Up />
      </IconButton>
      <IconButton onClick={handleCtrl("tilt", false)}>
        <Down />
      </IconButton>
    </Stack>
  )

}

export default UpDownCtrl;