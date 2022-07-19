import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';


const UpDownCtrl = (props) => {
  const socketCtx = useSocketContext();
  const appCtx = useAppContext();

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

    socketCtx.socket.emit("footer", {
      status: "Last change by: " + socketCtx.username,
      componentId: props.component
    })

    appCtx.addLog("User changed the position on " + props.component)
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