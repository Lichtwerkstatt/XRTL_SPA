import Settings from '../UI/CtrlUnits/ESPCamPlusSettings';
import Window from '../UI/experimentUI/Window';
import { useState } from 'react';

/**
 * ESPCam component window
 * 
 * @description This React component returns a window with the ESPCam stream and the settings for it.
 * 
 * @param {string} controlId - controlId
 * @param {string} title - For setting the title within the window
 * @param {number} top - For the positioning of the window 
 * @param {number} left - For the positioning of the window 
 * @param {boolean} setting - If the variable is set to true, the settings are displayed within the ESPCam window; if false, they are hidden.
 * @param {function} setSettings(newVal) - Function to change the value of the settings varibale
 * 
 * @returns {React.ReactElement} ESPCam component window
 */
const ESPCamStream = (props) => {
  // Handles changing the width of the component window when the settings are to be shown or hidden
  const [setting, setSetting] = useState(false)
  var width = window.innerWidth

  if (setting) {
    width = 1000;
  } else if (!setting) {
    width = 670;
  }

  return (
    <Window
      id={props.id}
      componentList={[props.id]}
      header={props.title}
      top={props.top}
      left={props.left}
      width={width}
      height={'430px'}
    >
      <Settings
        component={props.id}
        width={width}
        setting={setting}
        setSetting={setSetting}
      />
    </Window>
  );
};
export default ESPCamStream;