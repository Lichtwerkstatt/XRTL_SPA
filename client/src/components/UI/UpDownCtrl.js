import { useSocketContext } from "../../services/SocketContext";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UpDownCtrl = (props) => {
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
    <Stack>
      <IconButton onClick={handleCtrl("up")}>
        <Up />
      </IconButton>
      <IconButton onClick={handleCtrl("down")}>
        <Down />
      </IconButton>
    </Stack>
  )

}

export default UpDownCtrl;