import KM100_Background from './media/km100_outline.png'
import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Window from '../UI/experimentUI/Window';

/**
 * KM100 component window
 * 
 * @description  This React component returns a window with the content for the KM100 component window.
 *  
 * @param {string} id - controlId of the entire component
 * @param {string} controlIdTop - controlId for the upper stepper motor 
 * @param {string} controlIdBottom - controlId for the lower stepper motor
 * @param {number} rotationTop - Initialisation value of upper control
 * @param {number} rotationBottom - Initialisation value of lower control
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} KM100 component window
 */
const KM100 = (props) => {
  return (
    <Window
      id={props.id}
      componentList={[props.controlIdBottom, props.controlIdTop]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      background={KM100_Background}
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.controlIdTop}
        top='20'
        left='160'
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.controlIdBottom}
        top='50'
        left='160'
      />
    </Window>
  );
};
export default KM100;