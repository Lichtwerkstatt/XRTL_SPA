import Window from "../UI/Window"
import SwitchOnOff from "../UI/SwitchOnOff";

import { useAppContext } from "../../services/AppContext";

const LaserCtrl = (props) => {
  const appCtx = useAppContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  return (
    <Window
      header ={props.title+ "("+props.id+")"}
      top={props.top}
      left={props.left}
      height="200px"
      width="200px"
      onClose={handleCloseWindow}
    >
    <SwitchOnOff
      component={props.id}
      top="0"
      left="0"
      />

    </Window>
  )
}

export default LaserCtrl;