import { useState, useEffect } from "react";
import { socket } from "../../services/socket";
import styles from "./RotaryCtrl.module.css";
import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";

const RotaryCtrl = (props) => {
  const [rotation, setRotation] = useState(props.rotation);
  const [enteredRotation, setEnteredRotation] = useState(0);

  useEffect(() => {
    socket.on("control", (payload) => {
      if (
        payload.component === props.component &&
        payload.control === props.control
      ) {
        console.log(
          props.component,
          " got Command ",
          props.control,
          payload.command
        );
        setRotation(payload.command.rotation);
      }
    });
  }, []);

  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value);
  };

  const rotCW_Handler = (event) => {
    event.preventDefault();
    const newRotation = Number(rotation) + Number(enteredRotation);
    setRotation(newRotation);
    socket.emit("control", {
      component: props.component,
      control: props.control,
      command: { steps: enteredRotation, rotation: newRotation },
    });
    props.newStatus("CW rotation by " + enteredRotation + " steps.");
  };

  const rotCCW_Handler = (event) => {
    event.preventDefault();
    const newRotation = Number(rotation) - Number(enteredRotation);
    setRotation(newRotation);
    socket.emit("control", {
      component: props.component,
      control: props.control,
      command: { steps: -1 * enteredRotation, rotation: newRotation },
    });
    props.newStatus("CCW rotation by " + enteredRotation + " steps.");
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
      <button onClick={rotCCW_Handler} className={styles.CtrlLeft}>
        <MdOutlineRotateLeft size={23} />
      </button>
      <button onClick={rotCW_Handler} className={styles.CtrlRight}>
        <MdOutlineRotateRight size={23} />
      </button>
      
    </form>
  );
};

export default RotaryCtrl;
