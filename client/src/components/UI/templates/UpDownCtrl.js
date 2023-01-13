import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { Stack, IconButton } from '@mui/material';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';

const UpDownCtrl = (props) => {
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
    <Stack >
      <IconButton onClick={handleCtrl("virtualTilt", true)} disabled={(socketCtx.connected && props.online) ? false : true} >
        <Up />
      </IconButton>
      <IconButton onClick={handleCtrl("virtualTilt", false)} disabled={(socketCtx.connected && props.online) ? false : true}  >
        <Down />
      </IconButton>
    </Stack>
  )
}
export default UpDownCtrl;