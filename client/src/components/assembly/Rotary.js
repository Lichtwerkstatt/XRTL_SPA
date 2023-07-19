import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Rotary_bg from './media/rotary_outline.png';
import Window from '../UI/experimentUI/Window';

/**
 * Rotary component window
 * 
 * @description This react component returns a window with the content for the rotary component window.
 *  
 * @param {string} controlId - controlId
 * @param {string} controlIdTop - controlId for the stepper motor 
 * @param {number} rotation - Initialisation value for the control element
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Rotary component window
 */
const Rotary = (props) => {
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      background={Rotary_bg}
    >
      <RotaryCtrl
        component={props.controlId}
        rotation={props.rotation}
        top='10'
        left='160'
      />
    </Window>
  );
};
export default Rotary;
