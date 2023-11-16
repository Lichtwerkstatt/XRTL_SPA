import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';

/**
 * Heater component window
 * 
 * @description  This React component returns a window with the content for the heater component window.
 *  
 * @param {string} id - controlId of the entire component
 * @param {string} controlIdHeater - controlId for the relais to turn on/off the heater
 * @param {string} controlIdT - controlId for the termistor
 * @param {string} title - For setting the title within the window
 * @param {boolean} setting - If the variable is set to true, the more heater settings are displayed within the Heater window; if false, they are hidden.
 * @param {function} setSettings(newVal) - Function to change the value of the settings varibale
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * 
 * @returns {React.ReactElement} Heater component window
 */
const Heater = (props) => {
    var width = window.innerWidth

    if (props.setting) {
        width = '673px'
    } else if (!props.setting) {
        width = '350px'
    }

    return (
        <Window
            id={props.id}
            componentList={[props.controlIdHeater, props.controlIdThermistor]}
            header={props.title}
            top={props.top}
            left={props.left}
            height='340px'
            width={width}
        >
            <HeaterCtrl
                component={props.controlIdHeater}
                componentT={props.controlIdThermistor}
                setting={props.setting}
                setSetting={props.setSetting}
            />
        </Window>
    )
}
export default Heater;