import BeamSplitterCtrl from "../UI/CtrlUnits/BeamSplitterCtrl";
import Window from "../UI/experimentUI/Window";

const BeamSplitter = (props) => {

  return (
    <Window
      id={props.controlId}
      controlId={props.controlId}
      header={props.title}
      top={props.top}
      left={props.left}
      height="190px"
      width="360px"

    >
      <BeamSplitterCtrl
        rotation={props.rotationTop}
        component={props.controlId}
        pinhole={props.controlId2}
        redLED={props.controlLED}
        whiteLED={props.controlLED2}
        led={props.LED}
        top="20"
        left="160"
      />
    </Window>
  );
};

export default BeamSplitter;
