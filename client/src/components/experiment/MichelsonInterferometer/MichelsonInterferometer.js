import Beamsplitter from "../../assembly/BeamSplitter";
import ESPCam from "../../assembly/ESPCamStream";
import LaserCtrl from "../../assembly/Laser";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import Cube from "../../assembly/BsCube";
import Lens from "../../assembly/Lens";
import { useState } from "react";

const MichelsonInterferometer = (props) => {
  let footer = "Initializing..."
  var zero = "0"
  const [setting, setSetting] = useState(false)

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

  return (
    <div>
      {/* KM100 */}
      {props.selected.has('KM100_1') && (
        <KM100
          title="Reference Mirror"
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
          title="Linear Movable Mirror"
          controlId={'linear_1'}
          LED={'led_linear'}
          footer={footer}
          rotation={zero}
          top={topMiddle}
          left={leftMiddle}
        />
      )}
      {/* Laser ctrl */}
      {props.selected.has('greenlaser_1') && (
        <KM100
          title="Laser Alignment"
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
        <LaserCtrl
          title="Power Supply"
          id={'greenlaserPower_1'}
          controlId={'greenlaser_1'}
          LED={'led_linear'}
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
          left={'500'}
          setting={setting}
          setSetting= {setSetting}
        />
      )}

      {/* Beamsplitter */}
      {props.selected.has('beamSplitter') && (
        <Beamsplitter
          title=" Retract. Beam Splitter"
          controlId={'beamSplitter'}
          footer={footer}
          top={100}
          left={1000}
        />
      )}

      {/* Lens */}
      {props.selected.has('lens') && (
        <Lens
          title="Lens"
          controlId={'lens'}
          footer={footer}
          top={600}
          left={1100}
        />
      )}


      {/* BeamSplitter Cube */}
      {props.selected.has('bscube') && (
        <Cube
          title="Beam Splitter"
          controlId={'bscube'}
          footer={footer}
          top={100}
          left={600}
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;