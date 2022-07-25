import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';
import { useState } from "react";

const UpDownCtrl = (props) => {
  const socketCtx = useSocketContext();
  const appCtx = useAppContext();
  const [onlineStatus, setOnlineStatus] = useState('');
  const [mouted, setMounted] = useState(true);
  const [footer, setFooter] = useState(props.footer);

  const handleCtrl = (direction, negativ) => (event) => {
    event.preventDefault();

    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      componentId: props.component,
      command: {
        controlId: direction,
        val: negativ ? 15 : -15
      }
    })

    socketCtx.socket.emit("footer", {
      status: "Last change by: " + socketCtx.username,
      componentId: props.component
    })

    socketCtx.socket.emit('getFooter', props.component)

    socketCtx.socket.on('getFooter', payload => {
      console.log("payload in rotCtrl on get Footer  ", payload)
      setFooter(payload.status)
      setOnlineStatus(props.online)
      if (mouted) { props.newStatus(String(payload.status)) }
    })

    appCtx.addLog("User changed the position on " + props.component)
  }

  return (
    <Stack>
      <IconButton onClick={handleCtrl("tilt", true)} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && onlineStatus) ? false : true} >
        <Up />
      </IconButton>
      <IconButton onClick={handleCtrl("tilt", false)} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && onlineStatus) ? false : true}  >
        <Down />
      </IconButton>
    </Stack>
  )
}

export default UpDownCtrl;