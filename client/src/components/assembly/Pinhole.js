import PH_Background from "./media/id15_outline.png";
import RotaryCtrl from "../UI/CtrlUnits/RotaryCtrl";
import Window from "../UI/experimentUI/Window";

/**
 * Pinhole component window
 * 
 * @description This react component returns a window with the content for the pinhole component window.
 *  
 * @param {string} controlId - controlId
 * @param {string} controlIdTop - controlId for the stepper motor 
 * @param {number} rotationTop - Initialisation value for the control element
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Pinhole component window
 */
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
