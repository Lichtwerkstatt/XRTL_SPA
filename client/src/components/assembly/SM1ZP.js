import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";

const SM1ZP = (props) => {
  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="250px"
      height="150px"
    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.id}
        control="linStage"
        top="35"
        left="150"
      />
    </Window>
  );
};

export default SM1ZP;
