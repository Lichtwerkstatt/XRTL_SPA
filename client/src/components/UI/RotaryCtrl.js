import { useState, useEffect, useRef } from "react";
import styles from "./RotaryCtrl.module.css";
import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"

const RotaryCtrl = (props) => {
  const [enteredRotation, setEnteredRotation] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [rotation, setRotation] = useState(0);
  var [mounted, setMounted] = useState(true);
  var direction;

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempRotaryCtrl = useRef();


  const rotaryCtrlEmit = () => {
    if (!mounted) {
      mounted = true;
      setMounted(true);

      socketCtx.socket.emit("command", {
        userId: socketCtx.username,
        componentId: props.component,
        command: "getStatus"
      });

      socketCtx.socket.emit('getFooter', props.component);

      socketCtx.socket.on('getFooter', payload => {
        if (payload.componentId === props.component) {
          setOnlineStatus(payload.online)
          props.newStatus(String(payload.status))
        }
      });

      socketCtx.socket.on("status", payload => {
        if (payload.componentId === props.component) {
          if (props.control === "top") {
            setRotation(payload.status.top.absolute)
          } else if (props.control === "bottom") {
            setRotation(payload.status.bottom.absolute)
          } else {
            setRotation(payload.status.linear.absolute)
          }
        }
      });

      socketCtx.socket.on('footer', payload => {
        if (payload.componentId === props.component) {
          props.newStatus(String(payload.status))
        }
      });

      mounted = false;
      setMounted(false);
    }
    return () => {
      mounted = false;
      setMounted(false);
    }
  }
  tempRotaryCtrl.current = rotaryCtrlEmit;

  useEffect(() => {
    tempRotaryCtrl.current();
  }, [socketCtx.socket]);

  const rotCW_Handler = name => (event) => {
    event.preventDefault();
    direction = 0;

    if (name === "left") {
      direction = -1 * Number(enteredRotation);
    } else if (name === "right") {
      direction = Number(enteredRotation);
    }
    if (direction !== 0) {
      socketCtx.socket.emit("command", {
        userId: socketCtx.username,
        componentId: props.component,
        command: {
          controlId: props.control,
          val: direction
        }
      });

      socketCtx.socket.emit("footer", {
        status: "Last change by: " + socketCtx.username,
        componentId: props.component
      });
    }
    appCtx.addLog("User initiated CW rotation on " + props.component + " / " + props.control + " by " + enteredRotation + " steps.");
  };

  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value);
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
      <button onClick={rotCW_Handler("left")} className={styles.CtrlLeft} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && onlineStatus) ? false : true}  >
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler("right")} className={styles.CtrlRight} disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && onlineStatus) ? false : true}>
        <MdOutlineRotateRight size={28} />
      </button>
    </form>
  );
};
export default RotaryCtrl;