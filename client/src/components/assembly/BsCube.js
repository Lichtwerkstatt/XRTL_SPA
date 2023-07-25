import Window from '../UI/experimentUI/Window';
import Cube from '../UI/ComponentDescription/Decription_Cube';

/**
 * Beamspliiter cube window
 * 
 * @description This react component returns a window with the description of the beamsplitter cube window.
 *  
 * @param {string} controlId - controlId
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Beamsplitter cube decription window
 */
const BsCube = (props) => {

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
      <Cube
        height='220px'
      />
    </Window>
  )
}
export default BsCube;