import Eye_Background from './media/Eye_outline.png'
import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Window from '../UI/experimentUI/Window';

/**
 * Eye component window
 * 
 * @description  This React component returns a window with the content for the eye component window.
 *  
 * @param {string} id - controlId of the entire component
 * @param {string} controlIdTop - controlId for the upper stepper motor 
 * @param {string} controlIdBottom - controlId for the lower stepper motor
 * @param {number} rotationTop - Initialisation value for upper control element
 * @param {number} rotationBottom - Initialisation value for lower control element
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
      background={Eye_Background}
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.controlIdTop}
        top='15'
        left='170'
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.controlIdBottom}
        top='35'
        left='170'
      />
    </Window>
  );
};
export default KM100;