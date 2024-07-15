import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';
import { useState, useEffect } from 'react';

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
    const [setting, setSetting] = useState(false)
    const isMobile = window.innerWidth <= 992;

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        //Handles Window Size when opening the Stream Window
        let newWidth = window.innerWidth;
        let newHeight = window.innerHeight;

        if (isMobile) {
        newWidth = setting ? 613: 320;
        newHeight = 260;
        } else {
        newWidth = setting ? 673 : 350;
        newHeight = 350;
        }

        setDimensions({ width: newWidth, height: newHeight });
    }, [setting, isMobile]);

    return (
        <Window
            id={props.id}
            componentList={[props.controlIdHeater, props.controlIdThermistor]}
            header={props.title}
            top={props.top}
            left={props.left}
            height={`${dimensions.height}px`}
            width={`${dimensions.width}px`}
        >
            <HeaterCtrl
                component={props.controlIdHeater}
                componentT={props.controlIdThermistor}
                setting={setting}
                setSetting={setSetting}
            />
        </Window>
    )
}
export default Heater;