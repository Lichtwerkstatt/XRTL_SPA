import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const SwitchOnOff = (props) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  const [footer, setFooter] = useState(props.footer);
  const [mouted, setMounted] = useState(true);
  const socketCtx = useSocketContext();
  const appCtx = useAppContext();
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
      userId: socketCtx.getNewUsername(),
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
        if (payload.status != undefined) { if (mouted) props.newStatus(String(payload.status)) }
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

  const switch_Handler = (event) => {
    event.preventDefault();
    //event.target.textContent = 'On';

    const newStatus = !switchStatus;


    socketCtx.socket.emit("command", {
      userId: socketCtx.getNewUsername(),
      componentId: 'Michelson_laser_power',
      command: {
        controlId: 'switch',
        val: newStatus
      }
    })
    socketCtx.socket.emit("footer", {
      status: "Last change by: " + socketCtx.getNewUsername(),
      componentId: props.component
    })


    console.log("Current Laser State: " + newStatus);
    setSwitchStatus(newStatus);
    appCtx.addLog("User set position on " + props.component + " to " + newStatus)
  }

  return (
    <div className="switchOnOff">
      <ThemeProvider theme={theme} >
        <Button variant="contained" onClick={switch_Handler} sx={{ width: '60px', padding: "10px", marginLeft: "20px", marginTop: "20px" }}>
          {switchStatus ? 'ON' : 'OFF'}</Button>
      </ThemeProvider>
    </div>
  )
}

export default SwitchOnOff
