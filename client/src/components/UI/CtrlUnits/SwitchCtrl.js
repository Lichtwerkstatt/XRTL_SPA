import { useSocketContext } from "../../../services/SocketContext";
import { ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from "react";
import { theme } from '../templates/Theme.js';
import Switch from '../templates/Switch';
import { Box } from '@mui/material';
import propTypes from "prop-types";

/**
 * SwitchCtrl component
 * 
 * @description This React component returns a switch with Off on the left and On on the right. This component only needs the contorlId.
 * 
 * @param {string} component - controlId 
 * 
 * @returns {React.ReactElement} SwitchCtrl control element
 */
const SwitchCtrl = (props) => {
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
    <ThemeProvider theme={theme} >
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '40px',
        border: '2px solid #00ffa8',
        borderRadius: '50px',
        textAlign: 'center',
        top: '40px',
        left: '10px'
      }}>
        <Box sx={{ ml: '-4px' }} >
          <Switch component={props.component} online={onlineStatus} switchStatus={switchIsOn} left='Off' right='On' option="switch" />
        </Box>
      </div>
    </ThemeProvider>
  )
}

SwitchCtrl.propTypes = {
  component: propTypes.string.isRequired,
}

export default SwitchCtrl
