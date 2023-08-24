import Imprint from './Imprint';
import Telescope1 from './Telescope_1';
import Telescope2 from './Telescope_2';
import AdaptiveMirror from './AdaptiveMirror';
import SHS from './SHS';
import propTypes from "prop-types";


/**
 * Description handler
 * 
 * @description This component handles the display and rendering of the descriptions of the components and the imprint. For this, the descriptions must be imported and defined within the 
 * variable renderOption as a component with the controlId as the key. This component must then be given the height of the window. The corresponding description is then returned within return. 
 * 
 * @param {string} component - controlId 
 * @param {string} height - Passes the size of the window to scale the content (is specified in pixels).
 * 
 * @returns {React.ReactElement} Component description to be displayed in the window
 * 
 * Examples are for the variable renderOption within return nothing is changed!
 * @example   linear_1: <SM1ZP height={props.height} />
 * @example   KM100_1: <KM100 height={props.height} />
 * @example   screen: <ESPCam height={props.height} />
 */
const DescriptionHandler = (props) => {

    const renderOption = {
        info: <Imprint height={props.height} />,
        telescope_1: <Telescope1 height={props.height} />,
        telescope_2: <Telescope2 height={props.height} />,
        mirror_1: <AdaptiveMirror height={props.height}/>,
        sensor_1: <SHS height={props.height}/>,

    }

    return (
        <div>{renderOption[props.component]}</div>
    )
}

DescriptionHandler.propTypes = {
    component: propTypes.string.isRequired,
    height: propTypes.string.isRequired,
}

export default DescriptionHandler;
