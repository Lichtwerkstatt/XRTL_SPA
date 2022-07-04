import { useSocketContext } from "../../services/SocketContext";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UpDownCtrl = (props) => {
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

  const handleCtrl = () => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.getNewUsername(),
      componentId: props.component,
      command: {
        controlId: "control",
        Up: 300,
        Down: 200,
        Left: 800,
        Right: 600
      }
    })
  }


  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <IconButton onClick={handleCtrl}>
          <Up />
        </IconButton>
        <IconButton onClick={handleCtrl}>
          <Down />
        </IconButton>
      </Stack>
    </ThemeProvider>
  )

}

export default UpDownCtrl;