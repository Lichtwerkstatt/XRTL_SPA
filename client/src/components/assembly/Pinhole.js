import PH_Background from "./media/id15_outline.png";
import RotaryCtrl from "../UI/CtrlUnits/RotaryCtrl";
import Window from "../UI/experimentUI/Window";

const Pinhole = (props) => {
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      height="240px"
      width="250px"
      background={PH_Background}
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.controlIdTop}
        top="20"
        left="160"
      />
    </Window>
  );
};
export default Pinhole;
