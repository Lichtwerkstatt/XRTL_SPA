import Settings from '../UI/CtrlUnits/ESPCamPlusSettings';
import Window from '../UI/experimentUI/Window';
import { useState, useEffect } from 'react';

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
  const [setting, setSetting] = useState(false);
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
      newWidth = setting ? 700 : 370;
      newHeight = 260;
    } else {
      newWidth = setting ? 1000 : 670;
      newHeight = 430;
    }

    setDimensions({ width: newWidth, height: newHeight });
  }, [setting, isMobile]);


  return (
    <Window
      id={props.id}
      componentList={[props.id]}
      header={props.title}
      top={props.top}
      left={props.left}
      width={`${dimensions.width}px`}
      height={`${dimensions.height}px`}
    >
      <Settings
        component={props.id}
        width={`${dimensions.width}px`}
        setting={setting}
        setSetting={setSetting}
      />
    </Window>
  );
};
export default ESPCamStream;