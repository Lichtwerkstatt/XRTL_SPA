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
 // console.log(props)

  const switchFunction = () => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      componentId: props.component,
      command: "getStatus"
    })

    socketCtx.socket.on("status", payload => {
      console.log("pay", payload)
      if (payload.componentId === props.component) {
        setSwitchStatus(payload.status['laser'])
      }
    })

    socketCtx.socket.on('footer', payload => {
      
      if (payload.componentId === props.component) {
      //  console.log("Footer", payload)
        props.newStatus(String(payload.status))
      }
    })

    socketCtx.socket.emit('getFooter', props.component)

    socketCtx.socket.on('getFooter', payload => {
      if (payload.componentId === props.component) {
        setOnlineStatus(!payload.online)
        props.newStatus(String(payload.status))
      }
    })

    appCtx.addLog("User set position on " + props.component + " to " + switchStatus)
  }

  tempSwitch.current = switchFunction
  useEffect(() => {
    tempSwitch.current();
  }, [socketCtx.socket])

  return (
    <div className="switchOnOff">
      <ThemeProvider theme={theme} >
        <Box sx={{ m: 2, width: 250 }}>
          <Switch component={props.component} command="switch" start='Off' end='On' checked={switchStatus} icon={document.getElementById("icon")} online={onlineStatus} option = "val"/>
          <GiLaserWarning id="icon" size={100} vertical-align="middle" color="grey" />
        </Box>
      </ThemeProvider>
    </div>
  )
}
export default LaserCtrl
