import { useState } from "react";
import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import SM1ZP_bg from "./media/linear_outline.png";
import { useSocketContext } from "../../services/SocketContext"

const SM1ZP = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  const handleChangeFooter = (newFooter) => {
    setFooter(newFooter);
  };

  const handleReset = () => {
    console.log(socketCtx.socket)
    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      componentId: props.id,
      command: "reset"
    })
  }

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="250px"
      height="235px"
      onClose={handleCloseWindow}
      onReset={handleReset}
      background={SM1ZP_bg}
      newStatus={handleChangeFooter}
      footer={footer}
    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.id}
        newStatus={handleChangeFooter}
        footer={footer}
        control="linear"
        top="35"
        left="160"
      />
    </Window>
  );
};

export default SM1ZP;
