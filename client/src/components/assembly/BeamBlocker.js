import BS_Background from "./media/BS_outline.png";
import RetractableCtrl from "../UI/CtrlUnits/RetractableCtrl";
import Window from "../UI/experimentUI/Window";

/**
 * BeamBlocker component window
 *
 * @description  This React component returns a window with the content for the LBeamBlocker component window.
 *
 * @param {string} id - controlId of the entire component (same as for the laser alignment)
 * @param {string} controlId - controlId for the relais
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window
 * @param {number} left - For the positioning of the window
 *
 * @returns {React.ReactElement} BeamBlocker component window
 */
const BeamBlocker = (props) => {
  return (
    <Window
      id={props.id}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      height="240px"
      width="250px"
      background={BS_Background}
    >
      <RetractableCtrl component={props.controlId} />
    </Window>
  );
};
export default BeamBlocker;
