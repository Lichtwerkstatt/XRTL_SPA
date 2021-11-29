import { useState, useEffect } from "react";
import { socket } from "../../services/socket";

const RotaryCtrl = (props) => {
  const [rotation, setRotation] = useState(props.rotation);
  const [enteredRotation, setEnteredRotation] = useState(0)

  useEffect(() => {
      socket.on('control', payload => {
          if (payload.component === props.component && payload.control === props.control)
          {console.log(props.component, " got Command ", props.control, payload.command)
            setRotation(payload.command.rotation)
        }
      })
  },[])

  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value)
  };

  const rotCW_Handler = (event) => {
    event.preventDefault();
    const newRotation = Number(rotation)+Number(enteredRotation)
    setRotation(newRotation)  
    socket.emit("control", {
      component: props.component,
      control: props.control,
      command: {steps: enteredRotation, rotation: newRotation},
    });
    props.newStatus("CW rotation by "+enteredRotation+" steps.")
  };

  const rotCCW_Handler = (event) => {
    event.preventDefault();
    const newRotation = Number(rotation)-Number(enteredRotation)
    setRotation(newRotation)  
    socket.emit("control", {
      component: props.component,
      control: props.control,
      command: {steps: -1*enteredRotation, rotation:newRotation},
    });
    props.newStatus("CCW rotation by "+enteredRotation+" steps.")
  };

  return (
    <form>
        <span>{rotation}</span>
      <input
        type="number"
        min="0"
        max="100"
        value={enteredRotation}
        onChange={changeRotationHandler}
      />
      <button onClick={rotCW_Handler}> CW</button>
      <button onClick={rotCCW_Handler}>CCW</button>
    </form>
  );
};

export default RotaryCtrl;
