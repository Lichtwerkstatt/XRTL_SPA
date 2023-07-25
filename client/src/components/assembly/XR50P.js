import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import XR50P_bg from './media/XR50P_outline.png';
import Window from '../UI/experimentUI/Window';

/**
 * XR50P component window
 * 
 * @description This react component returns a window with the content for the XR50P component window.
 *  
 * @param {string} controlId - controlId
 * @param {number} rotation - Initialisation value for the control element
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} XR50P component window
 */
const XR50P = (props) => {
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      background={XR50P_bg}

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
export default XR50P;
