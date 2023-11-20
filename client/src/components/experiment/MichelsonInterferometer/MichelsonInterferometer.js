import MultiComponentSelection from '../../assembly/MultiComponentSelection';
import ESPCam from '../../assembly/ESPCamStream';
import Heater from '../../assembly/Heater';
import Rotary from '../../assembly/Rotary';
import Laser from '../../assembly/Laser';
import KM100 from '../../assembly/KM100';
import SM1ZP from '../../assembly/SM1ZP';
import { useState } from 'react';


const MichelsonInterferometer = (props) => {
  let footer = 'Initializing...'
  const [setting, setSetting] = useState(false)
  const [settingHeater, setSettingHeater] = useState(false)

  var height = window.innerHeight;
  var width = window.innerWidth;
  var halfWidth = width / 2;
  var topHigh = String(height - (height / 3 * 2.7))
  var topHighMiddle = String(height - (height / 1.4))
  var topMiddle = String(height - (height / 2.15))
  var leftLeft = String(width - (halfWidth * 1.9))
  var leftMiddle = String(width - (halfWidth * 1.8))
  var leftRight = String(width - (halfWidth * 0.47))
  var leftMiddleRight = String(width - (halfWidth * 0.4))
  var leftCam = String(width - (halfWidth * 1.485))

  return (
    <div>
      {/* KM100 */}
      {props.selected.has('KM100_1') && (
        <KM100
          title='Reference Mirror'
          id={'KM100_1'}
          controlIdTop={'KM100_top_1'}
          controlIdBottom={'KM100_bottom_1'}
          rotationTop={0}
          rotationBottom={0}
          footer={footer}
          top={topHigh}
          left={leftLeft}
        />
      )}
      {/* Linear stage */}
      {props.selected.has('linear_1') && (
        <SM1ZP
          title='Linear Movable Mirror'
          controlId={'linear_1'}
          footer={footer}
          rotation={0}
          top={topMiddle}
          left={leftMiddle}
        />
      )}
      {/* Rotary stage plate*/}
      {props.selected.has('plate_rotation') && (
        <Rotary
          title='Glass Plate Rotation Stage'
          controlId={'plate_rotation'}
          footer={footer}
          rotation={0}
          top={topMiddle}
          left={leftRight}
        />
      )}
      {/* Rotary stage Measurement Mirror*/}
      {props.selected.has('heater_rotation') && (
        <Rotary
          title='Mirror Changing Stage'
          controlId={'heater_rotation'}
          footer={footer}
          rotation={0}
          top={topHighMiddle}
          left={leftMiddle}
        />
      )}
      {/* Laser ctrl */}
      {props.selected.has('greenlaser_1') && (
        <KM100
          title='Laser Alignment'
          id={'greenlaser_1'}
          controlIdTop={'greenlaser_top_1'}
          controlIdBottom={'greenlaser_bottom_1'}
          footer={footer}
          top={topMiddle}
          left={leftMiddleRight}
        />
      )}
      {/* Laser power */}
      {props.selected.has('greenlaserPower_1') && (
        <Laser
          title='Power Supply'
          id={'greenlaserPower_1'}
          controlId={'greenlaser_1'}
          footer={footer}
          top={topHigh}
          left={leftRight}
        />
      )}
      {/* Cam1 */}
      {props.selected.has('screen') && (
        <ESPCam
          title='Screen'
          id={'screen'}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
          setting={setting}
          setSetting= {setSetting}
        />
      )}
      {/* Heater */}
      {props.selected.has('heater') && (
        <Heater
          title='Heatable Mirror Stage'
          id={'heater'}
          controlIdHeater={'heater'}
          controlIdThermistor={'thermistor'}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
          setting={settingHeater}
          setSetting= {setSettingHeater}
        />
      )}

      {/* Beam splitter */}
      {props.selected.has('experimentSelection') && (
        <MultiComponentSelection
          title='Multi Component Selection'
          controlId={'experimentSelection'}
          controlId2={'pinhole'}
          controlLED={'redLED'}
          controlLED2={'whiteLED'}
          footer={footer}
          top={topMiddle}
          left={halfWidth}
        />
      )}

    </div>
  );
};
export default MichelsonInterferometer;