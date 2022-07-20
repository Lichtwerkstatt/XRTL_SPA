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
  const [componentList, setComponentList] = useState([]);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempRotaryCtrl = useRef();

  const rotaryCtrlEmit = () => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      componentId: props.component,
      command: "getStatus"
    })

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
    });

    socketCtx.socket.on('newComponent', payload => {
      console.log(payload)
      setComponentList(payload);
    })

    socketCtx.socket.on('footer', payload => {
      if (payload.componentId === props.component) {
        setFooter(payload.status)
        if (mouted) { props.newStatus(String(payload.status)) }
      }
    })

    socketCtx.socket.emit('getFooter', props.component)

    socketCtx.socket.on('getFooter', payload => {
      setFooter(payload.status)
      if (mouted) { props.newStatus(String(payload.status)) }
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
        userId: socketCtx.username,
        componentId: props.component,
        command: {
          controlId: props.control,
          val: direction
        }
      })

      socketCtx.socket.emit("footer", {
        status: "Last change by: " + socketCtx.username,
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
      <button onClick={rotCW_Handler("left")} className={styles.CtrlLeft} disabled={(socketCtx.socket.connected || appCtx.busyComps.has(props.component) || componentList.includes(props.component)) ? false : true}  >
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler("right")} className={styles.CtrlRight} disabled={(socketCtx.socket.connected || appCtx.busyComps.has(props.component)) ? false : true}>
        <MdOutlineRotateRight size={28} />
      </button>
    </form >
  );
};
export default RotaryCtrl;
