import ESPCam from '../UI/CtrlUnits/ESPCamPlusSettings';
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
  var height = 0;
  var mobile = true;

  if (0 < width && width < 576) {
    width = '350px'
    height = '260px'
  }
  else if (576 < width && width < 768) {
    width = '510px'
    height = '340px'
  }
  else if (768 < width && width < 1000) {
    width = '650px'
    height = '430px'
  } else {
    width = '1000px'
    height = '430px'
  }

  if (setting && width === '1000px') {
    width = '1000px';
    mobile = false
  } else if (!setting && width === '1000px') {
    width = '670px';
    mobile = false;
  }

  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width={width}
      height={height}
    >
      <ESPCam
        component={props.controlId}
        width={width}
        height={height}
        setting={setting}
        setSetting={setSetting}
        mobile={mobile}
      />
    </Window>
  );
};
export default ESPCamStream;