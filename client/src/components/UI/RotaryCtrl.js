import { useState, useEffect, useRef } from "react";
import styles from "./RotaryCtrl.module.css";
import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"

const RotaryCtrl = (props) => {
  const [rotation, setRotation] = useState(0);
  const [enteredRotation, setEnteredRotation] = useState(0);
  const [mouted, setMounted] = useState(true);
  const [footer, setFooter] = useState(props.footer);
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempRotaryCtrl = useRef();


  const rotaryCtrlEmit = () => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.getNewUsername(),
      componentId: props.component,
      command: "getStatus"
    })
    //console.log(props.newStatus("Working"))

    /* STATUS UPDATE HANDLIN */
    socketCtx.socket.on("status", payload => {
      if (payload.componentId === props.component) {
        if (props.control === "top") {
          setRotation(payload.status.top.absolute)

        } else if (props.control === "bottom") {
          setRotation(payload.status.bottom.absolute)
        } else {
          setRotation(payload.status.linear.absolute)
        }
        setFooter(payload.footer)
      }
    }); //TODO: Update Footer of UI Window with Status

    socketCtx.socket.on('footer', payload => {
      if (payload.componentId === props.component) {
        console.log(payload.status)
        setFooter(payload.status)
        if (mouted) {
          console.log("chbsdhcbdhcd");
          props.newStatus(String(payload.status))
        }
      }
    })

    return () => setMounted(false)
  }
  tempRotaryCtrl.current = rotaryCtrlEmit;

  useEffect(() => {
    tempRotaryCtrl.current()
  }, [socketCtx.socket]);

  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value);
  };

  const rotCW_Handler = name => (event) => {
    event.preventDefault();
    var direction = 0
    if (name === "left") {
      direction = -1 * Number(enteredRotation)
    } else if (name === "right") {
      direction = Number(enteredRotation)
    }
    if (direction !== 0) {
      socketCtx.socket.emit("command", {
        userId: socketCtx.getNewUsername(),
        componentId: props.component,
        command: {
          controlId: props.control,
          val: direction
        }
      })
      socketCtx.socket.emit("footer", {
        status: "Last change by: " + socketCtx.getNewUsername(),
        componentId: props.component
      })

    }
    appCtx.addLog("User initiated CW rotation on " + props.component + " / " + props.control + " by " + enteredRotation + " steps.")
  };

  return (
    <form className={styles.rotaryCtrl} style={{ top: props.top + "px", left: props.left + "px" }}>
      <div className={styles.rotaryCtrl}>
        <span>{Number(rotation)}</span>
        <input
          type="number"
          min="0"
          max="100"
          value={enteredRotation}
          onChange={changeRotationHandler}
        />
      </div>
      <button onClick={rotCW_Handler("left")} className={styles.CtrlLeft} disabled={appCtx.busyComps.has(props.component)} >
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler("right")} className={styles.CtrlRight} disabled={appCtx.busyComps.has(props.component)}>
        <MdOutlineRotateRight size={28} />
      </button>
    </form>
  );
};

export default RotaryCtrl;
