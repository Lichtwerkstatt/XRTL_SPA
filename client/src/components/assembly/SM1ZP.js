import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import SM1ZP_bg from './media/linear_outline.png';
import Window from '../UI/experimentUI/Window';

/**
 * SM1ZP component window
 * 
 * @description This react component returns a window with the content for the SM1ZP component window.
 *  
 * @param {string} controlId - controlId
 * @param {string} controlIdTop - controlId for the stepper motor 
 * @param {number} rotationTop - Initialisation value for the control element
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} SM1ZP component window
 */
const SM1ZP = (props) => {
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      background={SM1ZP_bg}
    >
      <RotaryCtrl
        component={props.controlId}
        rotation={props.rotation}
        top='35'
        left='160'
      />
    </Window>
  );
};

export default SM1ZP;
