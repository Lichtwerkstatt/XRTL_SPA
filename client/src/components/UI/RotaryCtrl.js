import { useState, useEffect } from "react";
import styles from "./RotaryCtrl.module.css";
import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";

import { useAppContext } from "../../services/AppContext";
import { useSocketContext} from "../../services/SocketContext"

const RotaryCtrl = (props) => {
  const [rotation, setRotation] = useState(props.rotation);
  const [enteredRotation, setEnteredRotation] = useState(0);

  const appCtx = useAppContext()
  const socketCtx = useSocketContext()

  useEffect(() => {

    /* STATUS UPDATE HANDLIN */
    socketCtx.socket.on("status", (payload) => { 
      if (payload.component === props.component ) {
        setRotation(payload.status.props.control);
      }
    }); //TODO: Update Footer of UI Window with Status
  }, [socketCtx.socket]);



  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value);
  };


  //TODO: Combine Rotation Handliner into one.

  const rotCW_Handler = (event) => {
    event.preventDefault();
    socketCtx.socket.emit("command", {
      userId:"user123",
      componentId: props.component,
      controlId: props.control,
      command: {
        steps: enteredRotation
      }

    })  
    appCtx.addLog("User initiated CW rotation on "+props.component+" / "+props.control+" by " +enteredRotation+" steps.")
  };

  const rotCCW_Handler = (event) => {
    event.preventDefault();
    socketCtx.socket.emit("command", {
      userId:"user123",
      componentId: props.component,
      controlId: props.control,
      command: {
        steps: -1 * enteredRotation
      }

    })  
    appCtx.addLog("User initiated CCW rotation on "+props.component+" / "+props.control+" by " +enteredRotation+" steps.")
  };

  return (
    <form className={styles.rotaryCtrl} style={{top:props.top+"px", left:props.left+"px"}}>
      <div className={styles.rotaryCtrl}>
        <span>{rotation}</span>
        <input
          type="number"
          min="0"
          max="100"
          value={enteredRotation}
          onChange={changeRotationHandler}
        />
      </div>
      <button onClick={rotCCW_Handler} className={styles.CtrlLeft} disabled={props.busy} > 
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler} className={styles.CtrlRight} disabled={props.busy}>
        <MdOutlineRotateRight size={28} />
      </button>
      
    </form>
  );
};

export default RotaryCtrl;
