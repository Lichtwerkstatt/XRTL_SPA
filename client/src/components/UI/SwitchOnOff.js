import { useState, useEffect, useRef } from "react";
import { useSocketContext } from "../../services/SocketContext";
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from './Switch';
import { GiLaserWarning } from "react-icons/gi"

const SwitchOnOff = (props) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  const [footer, setFooter] = useState(props.footer);
  const [mouted, setMounted] = useState(true);
  const socketCtx = useSocketContext();
  const tempSwitch = useRef()

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#01bd7d',
        main: '#01bd7d',
        dark: '#01bd7d',
        contrastText: '#fff',
      },
    }
  })

  const switchFunction = () => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      componentId: props.component,
      command: "getStatus"
    })

    socketCtx.socket.on("status", payload => {
      if (payload.componentId === props.component) {
        setSwitchStatus(payload.status['laser'])
      }
    })

    socketCtx.socket.on('footer', payload => {
      if (payload.componentId === props.component) {
        setFooter(payload.status)
        if (mouted) {
          props.newStatus(String(payload.status))
        }
      }
    })

    socketCtx.socket.emit('getFooter', props.component)

    socketCtx.socket.on('getFooter', payload => {
      setFooter(payload.status)
      if (mouted) {
        if (payload.status !== undefined) { if (mouted) props.newStatus(String(payload.status)) }
        else {
          if (mouted) props.newStatus(String("Connected!"))
        }
      }
    })
  }

  tempSwitch.current = switchFunction
  useEffect(() => {
    tempSwitch.current();
  }, [socketCtx.socket])

  return (
    <div className="switchOnOff">
      <ThemeProvider theme={theme} >
        <Box sx={{ m: 2, width: 250 }}>
          <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus} icon={document.getElementById("icon")} />
          <GiLaserWarning id="icon" size={100} vertical-align="middle" color="grey" />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default SwitchOnOff
