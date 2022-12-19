import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { useState, useEffect } from "react";
import { GiLaserWarning } from "react-icons/gi"
import { Box } from '@mui/material';
import Switch from '../templates/Switch';

const LaserCtrl = (props) => {
  const [switchValue, setSwitch] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const socketCtx = useSocketContext();

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

  useEffect(() => {
    const status = (payload) => {
      if (payload.componentId === props.component) {
        setSwitch(payload.status.switch.isOn)
      }
    }
    const footer = (payload) => {
      if (payload.componentId === props.component) {
        props.newStatus(String(payload.status))
      }
    }

    const getFooter = (payload) => {
      if (payload.componentId === props.component) {
        setOnlineStatus(!payload.online)
        props.newStatus(String(payload.status))
      }
    }

    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      componentId: props.component,
      command: "getStatus"
    })

    socketCtx.socket.emit('getFooter', props.component)

    socketCtx.socket.on("status", status);

    socketCtx.socket.on('footer', footer)

    socketCtx.socket.on('getFooter', getFooter);

    return () => {
      socketCtx.socket.removeAllListeners('status', status)
      socketCtx.socket.removeAllListeners('footer', footer)
      socketCtx.socket.removeAllListeners('getFooter', getFooter)
    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket])


  return (
    <div className="switchOnOff">
      <ThemeProvider theme={theme} >
        <Box sx={{ m: 2, width: 250 }}>
          <Switch component={props.component} command="switch" start='Off' end='On' icon={document.getElementById("icon")} online={onlineStatus} option="val" switchStatus={switchValue} />
          <GiLaserWarning id="icon" size={100} vertical-align="middle" color="grey" />
        </Box>
      </ThemeProvider>
    </div>
  )
}
export default LaserCtrl
