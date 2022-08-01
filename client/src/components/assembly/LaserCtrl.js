import { useState } from "react";
import Window from "../UI/Window"
import SwitchOnOff from "../UI/SwitchOnOff";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"

const LaserCtrl = (props) => {
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
    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      componentId: props.id,
      command: "reset"
    })
  }
  const handleInfo = () => {
    console.log("Info")
  }

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      height="200px"
      width="300px"
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}
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