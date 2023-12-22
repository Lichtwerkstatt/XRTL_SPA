import PS_Background from './media/PS_outline.png';
import LaserCtrl from '../UI/CtrlUnits/LaserCtrl';
import Window from '../UI/experimentUI/Window';

/**
 * Laser power supply component window
 * 
 * @description  This React component returns a window with the content for the Laser power supply component window.
 *  
 * @param {string} id - controlId of the entire component (same as for the laser alignment)
 * @param {string} controlId - controlId for the relais
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Laser power supply component window
 */
const Laser = (props) => {
  return (
    <Window
      id={props.id}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      background={PS_Background}

    >
      <LaserCtrl
        component={props.controlId}
      />
    </Window>
  )
}
export default Laser;