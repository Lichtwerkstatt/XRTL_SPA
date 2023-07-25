import Window from '../UI/experimentUI/Window';
import Lens from '../UI/ComponentDescription/Decription_Lens';

/**
 * Lens description window
 * 
 * @description This React component returns a window with the description of the lens component.
 * 
 * @param {string} controlId - controlId
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Lens description window
 */
const Laser = (props) => {

  return (
    <Window
      id={props.controlId}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      footer={'empty'}
      topper={'none'}
    >
      <Lens
        height='220px'
      />
    </Window>
  )
}
export default Laser;