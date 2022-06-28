import { useState } from "react";
import Window from "../UI/Window"
import SwitchOnOff from "../UI/SwitchOnOff";
import { useAppContext } from "../../services/AppContext";

const LaserCtrl = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const appCtx = useAppContext();

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