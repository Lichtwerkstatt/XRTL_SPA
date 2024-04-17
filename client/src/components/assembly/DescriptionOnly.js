import Window from '../UI/experimentUI/Window';

const Lens = (props) => {

  /**
   * Lens component window
   * 
   * @description This React component returns a window with the description of the Lens component.
   *  
   * @param {string} controlId - controlId
   * @param {string} title - For setting the title within the window
   * @param {number} top - For the positioning of the window 
   * @param {number} left - For the positioning of the window 
   * 
   * @returns {React.ReactElement} Lens component window
   */
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      footer={'none'}
      topper={'none'}
      info={false}
    />
    )
}
export default Lens;