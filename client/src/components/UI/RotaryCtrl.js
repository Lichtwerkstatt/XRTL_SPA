import { useState, useEffect, useRef } from "react";
import styles from "./RotaryCtrl.module.css";
import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"

const RotaryCtrl = (props) => {
  const [rotation, setRotation] = useState(props.rotation);
  const [enteredRotation, setEnteredRotation] = useState(0);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempRotaryCtrl = useRef();

  const rotaryCtrlEmit = () => {
    /* STATUS UPDATE HANDLIN */
    socketCtx.socket.on("status", payload => {
      if (payload.componentId === props.component) {
        setRotation(payload.status[props.control]);
      }
    }); //TODO: Update Footer of UI Window with Status
  }
  tempRotaryCtrl.current = rotaryCtrlEmit;

  useEffect(() => {
    tempRotaryCtrl.current()
  }, [socketCtx.socket]);

  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value);
  };

  //TODO: Combine Rotation Handliner into one.

  const rotCW_Handler = (event) => {
    event.preventDefault();
    socketCtx.socket.emit("command", {
      userId: socketCtx.getNewUsername(),
      componentId: props.component,
      command: {
        controlId: props.control,
        val: Number(enteredRotation)
      }

    })
    appCtx.addLog("User initiated CW rotation on " + props.component + " / " + props.control + " by " + enteredRotation + " steps.")
  };

  const rotCCW_Handler = (event) => {
    event.preventDefault();
    socketCtx.socket.emit("command", {
      userId: socketCtx.getNewUsername(),
      componentId: props.component,
      command: {
        controlId: props.control,
        val: -1 * Number(enteredRotation)
      }

    })
    appCtx.addLog("User initiated CCW rotation on " + props.component + " / " + props.control + " by " + enteredRotation + " steps.")
  };

  return (
    <form className={styles.rotaryCtrl} style={{ top: props.top + "px", left: props.left + "px" }}>
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
      <button onClick={rotCCW_Handler} className={styles.CtrlLeft} disabled={appCtx.busyComps.has(props.component)} >
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler} className={styles.CtrlRight} disabled={appCtx.busyComps.has(props.component)}>
        <MdOutlineRotateRight size={28} />
      </button>

    </form>
  );
};

export default RotaryCtrl;
