import BeamSplitterCtrl from "../UI/CtrlUnits/BeamSplitterCtrl";
import Window from "../UI/experimentUI/Window";

/**
 * MultiCtrl window
 * 
 * @description  This React component returns a window with the content for the MultiCtrl component window.
 *  
 * @param {string} id - controlId of the entire component
 * @param {string} controlId - controlId for the React app to know, which window should be open/closed
 * @param {string} controlId2 - controlId to control the pinhole
 * @param {string} controlIdLED - controlId to control the red lED
 * @param {string} controlIdLED2 - controlId to control the white lED
 * @param {string} title - For setting the title within the window
 * @param {number} height - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} MultiCtrl component window
 */
const MultiCtrl = (props) => {

  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId, props.controlId2, props.controlLED, props.controlLED2]}
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
      />
    </Window>
  );
};

export default MultiCtrl;
