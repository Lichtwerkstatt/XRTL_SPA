import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import SM1ZP_bg from "./media/linear_outline.png";

const SM1ZP = (props) => {
  const appCtx = useAppContext()

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="250px"
      height="235px"
      onClose={handleCloseWindow}
      background={SM1ZP_bg}
    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.id}
        control="linear"
        top="35"
        left="160"
      />
    </Window>
  );
};

export default SM1ZP;
