import { useState, useEffect } from "react";
import styles from "./SliderCtrl.module.css"
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";

const SliderCtrl = (props) => {
  const [sliderPos, setSliderPos] = useState(props.sliderPos);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  useEffect(() => {
    socketCtx.socket.on("status", payload => {
      console.log(payload);
      if (payload.component === props.component) {
        setSliderPos(payload.status[props.control]);
      }
    })
  }, [socketCtx.socket])

  const sliderHandler = (event) => {
    event.preventDefault();
    console.log("Setting...")
    setSliderPos((prevState) => { return event.target.value });
  }

  const sliderCtrl = (event) => {
    event.preventDefault();
    setSliderPos(event.target.value);
    console.log("Sending Command " + event.target.value);
    socketCtx.socket.emit("command", {
      userId: "user123",
      componentId: props.component,
      command: {
        position: sliderPos
      }
    })
    appCtx.addLog("User set position on " + props.component + " to " + sliderPos)
  }

  return (
    <form className={styles.sliderCtrl} style={{ top: props.top + "px", left: props.left + "px" }}>
      <div className={styles.sliderCtrl}>
        <span>{sliderPos}</span>
        <input type="range" min="0" max="100" value={sliderPos} className={styles.sliderCtrl} onChange={sliderHandler} onMouseUp={sliderCtrl} />
      </div>
    </form>
  )

}

export default SliderCtrl;