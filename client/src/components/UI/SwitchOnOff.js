import {useState, useEffect} from "react";
import styles from "./SwitchOnOff.module.css"
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";

const SwitchOnOff = (props) => {
  const [switchStatus, setSwitchStatus] = useState(false);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  useEffect(() => {
    socketCtx.socket.on("status", payload => {
      if (payload.componentId === props.component) {
        setSwitchStatus(payload.status['laser'])
      }
    })
  }, [socketCtx.socket])

  const switch_Handler = (event) => {
    event.preventDefault();
    const newStatus = !switchStatus;
    socketCtx.socket.emit("command", {
      userId: "user123",
      componentId: props.component,
      command: {
        laser: newStatus
      }      
    })
    console.log("Current Laser State: "+newStatus);
    setSwitchStatus(newStatus);
  
  }

  return (
    <button data-testid="switchtest" onClick={switch_Handler}>
      {switchStatus ? 'ON' : 'OFF'}</button>

  )
}

export default SwitchOnOff;