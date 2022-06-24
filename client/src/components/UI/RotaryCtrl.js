import { useState, useEffect, useRef } from "react";
import styles from "./RotaryCtrl.module.css";
import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"

const RotaryCtrl = (props) => {
  const [rotation, setRotation] = useState(props.rotation);
  const [enteredRotation, setEnteredRotation] = useState(0);
  const [footer, setFooter] = useState();
  const [topRotation, setTopRotation] = useState(0);
  const [bottomRotation, setBottomRotation] = useState(0);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempRotaryCtrl = useRef();

  //um status von Komponente beim öffnen des WIndows zu bekommen
  socketCtx.socket.emit("getStatus", {
    userId: socketCtx.getNewUsername(),
    componentId: props.component,
    command: "getStatus"
  })

  //Auf Status hin die Werte setzen
  socketCtx.socket.on("status", payload => {
    if (payload.componentId === props.component) {
      setTopRotation(payload.status[props.top]);
      setBottomRotation(payload.status[props.bottom]);
      //setFooter("Connected!")
    }
  })

  const rotaryCtrlEmit = () => {
    /* STATUS UPDATE HANDLIN */
    socketCtx.socket.on("status", payload => {
      if (payload.componentId === props.component) {
        setTopRotation(payload.status[props.top]);
        setBottomRotation(payload.status[props.bottom]);
        //setFooter("Connected!")
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
    var newRotation = parseInt(rotation) + parseInt(enteredRotation)
    setRotation(newRotation);
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
    var newRotation = rotation - enteredRotation
    setRotation(newRotation);
    appCtx.addLog("User initiated CCW rotation on " + props.component + " / " + props.control + " by " + enteredRotation + " steps.")
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
