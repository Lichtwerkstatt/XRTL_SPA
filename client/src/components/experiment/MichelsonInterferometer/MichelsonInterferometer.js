import BeamSplitter from '../../assembly/BeamSplitter';
import ESPCam from '../../assembly/ESPCamStream';
import Heater from '../../assembly/Heater';
import Rotary from '../../assembly/Rotary';
import Laser from '../../assembly/Laser';
import KM100 from '../../assembly/KM100';
import SM1ZP from '../../assembly/SM1ZP';


const MichelsonInterferometer = (props) => {
  let footer = 'Initializing...'
  var zero = '0'

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
          title='Mirror'
          id={'KM100_1'}
          controlIdTop={'KM100_top_1'}
          controlIdBottom={'KM100_bottom_1'}
          LED={'led_KM100'}
          rotationTop={zero}
          rotationBottom={zero}
          footer={footer}
          top={topHigh}
          left={leftLeft}
        />
      )}
      {/* Linear stage */}
      {props.selected.has('linear_1') && (
        <SM1ZP
          title='Mirror Stage'
          controlId={'linear_1'}
          LED={'led_linear'}
          footer={footer}
          rotation={zero}
          top={topMiddle}
          left={leftMiddle}
        />
      )}
      {/* Rotary stage plate*/}
      {props.selected.has('rotary_1') && (
        <Rotary
          title='Plate Stage'
          controlId={'plate_rotation'}
          LED={'led_plate'}
          footer={footer}
          rotation={zero}
          top={topMiddle}
          left={leftRight}
        />
      )}
      {/* Rotary stage Measurement Mirror*/}
      {props.selected.has('rotary_2') && (
        <Rotary
          title='Measure Stage'
          controlId={'heater_rotation'}
          LED={'led_heater'}
          footer={footer}
          rotation={zero}
          top={topHighMiddle}
          left={leftMiddle}
        />
      )}
      {/* Laser ctrl */}
      {props.selected.has('greenlaser_1') && (
        <KM100
          title='Laser'
          id={'greenlaser_1'}
          controlIdTop={'greenlaser_top_1'}
          controlIdBottom={'greenlaser_bottom_1'}
          LED={'led_laser'}
          rotationTop={zero}
          rotationBottom={zero}
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
          LED={'led_laser'}
          footer={footer}
          top={topHigh}
          left={leftRight}
        />
      )}
      {/* Cam1 */}
      {props.selected.has('screen') && (
        <ESPCam
          title='Screen'
          controlId={'screen'}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}
      {/* Heater */}
      {props.selected.has('heater') && (
        <Heater
          title='Heater'
          id={'heater'}
          controlIdHeater={'heater'}
          controlIdThermistor={'thermistor'}
          LED={'led_linear'}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}

      {/* Beam splitter */}
      {props.selected.has('experimentSelection') && (
        <BeamSplitter
          title='Beam modifier/LED'
          controlId={'experimentSelection'}
          controlId2={'pinhole'}
          controlLED={'redLED'}
          controlLED2={'whiteLED'}
          LED={'led_selection'}
          footer={footer}
          top={topMiddle}
          left={halfWidth}
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;