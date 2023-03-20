import { ThemeProvider } from '@mui/material/styles';
import { useSocketContext } from "../../../services/SocketContext";
import { GiLaserWarning } from "react-icons/gi";
import { useState, useEffect } from "react";
import { theme } from '../templates/Theme.js';
import Switch from '../templates/Switch';
import { Box } from '@mui/material';

const LaserCtrl = (props) => {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [switchIsOn, setSwitch] = useState(false);
  const socketCtx = useSocketContext();

  useEffect(() => {
    const status = (payload) => {
      if (payload.controlId === props.component) {
        setOnlineStatus(true)
        setSwitch(payload.status.isOn)
      }
    }

    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      controlId: props.component,
      getStatus: true
    })

    socketCtx.socket.emit('getFooter', props.component)

    socketCtx.socket.on("status", status);

    return () => {
      socketCtx.socket.removeAllListeners('status', status)
    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket])


  return (
    <div className="switchOnOff">
      <ThemeProvider theme={theme} >
        <Box sx={{ m: 2, width: 250 }}>
          <Switch component={props.component} led={props.led} icon={document.getElementById("icon")} online={onlineStatus} switchStatus={switchIsOn} start='Off' end='On' option="switch" />
          <GiLaserWarning id="icon" size={100} vertical-align="middle" color="grey" />
        </Box>
      </ThemeProvider>
    </div>
  )
}
export default LaserCtrl
