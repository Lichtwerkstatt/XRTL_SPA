import LaserCtrl from "../../assembly/Laser";
import ESPCam from "../../assembly/ESPCamStream";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";

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
          LED={'led_screen'}
          footer={footer}
          top={topHighMiddle}
          left={leftLeft}
        />
      )}

      {/* Beamsplitter */}
      {props.selected.has('beamsplitter') && (
        <ESPCam
          title="Beamsplitter"
          controlId={'beamsplitter'}
          LED={'led_screen'}
          footer={footer}
          top={topHighMiddle}
          left={leftLeft}
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;