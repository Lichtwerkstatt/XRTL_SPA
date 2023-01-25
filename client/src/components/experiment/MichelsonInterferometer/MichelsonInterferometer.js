import LaserCtrl from "../../assembly/LaserCtrl";
import Heater from "../../assembly/Heater";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import ESPCam from "../../assembly/ESPCamStream";
import BeamSplitter from "../../assembly/BeamSplitter"
import Rotary from "../../assembly/Rotary"


const MichelsonInterferometer = (props) => {
  let footer = "Initializing..."
  var zero = "0"

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

  var componentList = ['Michelson_KM100', 'Michelson_linear', 'Michelson_laser', 'Michelson_LaserPower', 'Michelson_cam', 'Michelson_heater', 'Cam_1', 'Michelson_beamSplitter']
  return (
    <div>
      {/* KM100 */}
      {props.selected.has('KM100_1') && (
        <KM100
          title="Mirror"
          id={'KM100_1'}
          controlIdTop={'KM100_top_1'}
          controlIdBottom={'KM100_bottom_1'}
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
          title="Mirror Stage"
          controlId={'linear_1'}
          id={componentList[1]}
          footer={footer}
          rotation={zero}
          top={topMiddle}
          left={leftMiddle}
        />
      )}
      {/* Rotary stage Prism*/}
      {props.selected.has('rotary_1') && (
        <Rotary
          title="Prism Stage"
          controlId={'rotary_1'}
          footer={footer}
          rotation={zero}
          top={topMiddle}
          left={leftRight}
        />
      )}
      {/* Rotary stage Measurement Mirror*/}
      {props.selected.has('rotary_2') && (
        <Rotary
          title="Measure Stage"
          controlId={'rotary_2'}
          footer={footer}
          rotation={zero}
          top={topHighMiddle}
          left={leftMiddle}
        />
      )}
      {/* Laser ctrl */}
      {props.selected.has('greenlaser_1') && (
        <KM100
          title="Laser"
          id={'greenlaser_1'}
          controlIdTop={'greenlaser_top_1'}
          controlIdBottom={'greenlaser_bottom_1'}
          rotationTop={zero}
          rotationBottom={zero}
          footer={footer}
          top={topMiddle}
          left={leftMiddleRight}
        />
      )}
      {/* Laser power */}
      {props.selected.has('greenlaserPower_1') && (
        <LaserCtrl
          title="Power Supply"
          controlId={'greenlaser_1'}
          footer={footer}
          top={topHigh}
          left={leftRight}
        />
      )}
      {/* Cam1 */}
      {props.selected.has('screen') && (
        <ESPCam
          title="Screen"
          controlId={'screen'}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}
      {/* Heater */}
      {props.selected.has('heater') && (
        <Heater
          title="Heater"
          controlIdHeater={'heater'}
          controlIdThermistor={'thermistor'}
          id={'heater'}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}

      {/* Beam splitter */}
      {props.selected.has('beamSplitter') && (
        <BeamSplitter
          title="Beam splitter"
          controlId={'beamSplitter'}
          footer={footer}
          top={topMiddle}
          left={halfWidth}
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;