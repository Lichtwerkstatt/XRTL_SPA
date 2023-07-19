import BS_Background from './media/BS_outline.png';
import BeamSplitterCtrl from '../UI/CtrlUnits/BeamSplitterCtrl';
import Window from '../UI/experimentUI/Window';

/**
 * Beamspliiter component window
 * 
 * @description This react component returns a window with the content for the beamspliiter component window.
 *  
 * @param {string} controlId - controlId
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Beamspliiter component window
 */
const BeamSplitter = (props) => {

    return (
        <Window
            id={props.controlId}
            componentList={[props.controlId]}
            header={props.title}
            top={props.top}
            left={props.left}
            height='240px'
            width='250px'
            background={BS_Background}
        >
            <BeamSplitterCtrl
                component={props.controlId}
            />

        </Window>
    )
};
export default BeamSplitter;
