import { useState, useRef, useEffect } from "react";
import Window from "../UI/Window"
import SwitchOnOff from "../UI/SwitchOnOff";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"


const LaserCtrl = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const appCtx = useAppContext();
  const [rotation, setRotation] = useState(0);
  const [enteredRotation, setEnteredRotation] = useState(0);
  const [mouted, setMounted] = useState(true);
  const socketCtx = useSocketContext();
  const tempRotaryCtrl = useRef();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  const handleChangeFooter = (newFooter) => {
    setFooter(newFooter);
    console.log("New Footer " + newFooter)
  };

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      height="200px"
      width="300px"
      onClose={handleCloseWindow}
      newStatus={handleChangeFooter}
      footer={footer}
    >
      <SwitchOnOff
        component={props.id}
        top="0"
        left="0"
        newStatus={handleChangeFooter}
        footer={footer}
      />
    </Window>
  )
}
export default LaserCtrl;