import Window from '../UI/experimentUI/Window';

/**
 * Description Component window 
 * 
 * @description This React component returns a window with the description of a component. 
 * Inside the DescriptionHandler.js file, the controlId and the class containing the description must 
 * be added to the dictionary.  
 * 
 * @param {string} id - controlId
 * @param {string} header - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * @param {string} height - Defines the height of the window
 * @param {string} width - Defines the width of the window
 * @param {string} footer - If set to 'empty', then the window has no footer.
 * @param {string} topper - If set to 'none', then no other button will be displayed in the tooper.
 * @param {boolean} info - If set to 'false', then the window does not need any content defined below 
 * <Winow/> based on the controlId, but gets it from the DescriptionHandler.
 * 
 * @returns {React.ReactElement} Telescope description window
 */
const Description = (props) => {

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
      info={false}
    />
  )
}
export default Description;