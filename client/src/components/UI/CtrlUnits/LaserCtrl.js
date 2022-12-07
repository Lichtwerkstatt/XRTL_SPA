import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { useState, useEffect, useRef } from "react";
import { GiLaserWarning } from "react-icons/gi"
import { Box } from '@mui/material';
import Switch from '../templates/Switch';

const LaserCtrl = (props) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const socketCtx = useSocketContext();
  const tempSwitch = useRef();
  const appCtx = useAppContext();

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
  console.log(socketCtx.socket.listeners('getFooter', 'command'))
  useEffect(() => {
  const status = (payload) => {
    if (payload.componentId === props.component) {
      setSwitchStatus(payload.status['laser'])
    }
  }

  const footer = (payload) => {
    if (payload.componentId === props.component) {
      //  console.log("Footer", payload)
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

    socketCtx.socket.on("status", status)

    socketCtx.socket.on('footer', footer)


    socketCtx.socket.on('getFooter', getFooter);

    return () => {
      socketCtx.socket.off('getFooter', getFooter)
      console.log("hello", socketCtx.socket.listeners())
    }
    //Comment needed to prevent a warning
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket])
  
 
  return (
    <div className="switchOnOff">
      <ThemeProvider theme={theme} >
        <Box sx={{ m: 2, width: 250 }}>
          <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus} icon={document.getElementById("icon")} online={onlineStatus} option="val" />
          <GiLaserWarning id="icon" size={100} vertical-align="middle" color="grey" />
        </Box>
      </ThemeProvider>
    </div>
  )
}
export default LaserCtrl
