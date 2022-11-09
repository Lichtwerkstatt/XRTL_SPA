import LaserCtrl from "../../assembly/LaserCtrl";
import Heater from "../../assembly/Heater";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import Cam1 from "../../assembly/Stream";
import Cam2 from "../../assembly/Cam2";
import Glas from "../../assembly/Glas"
//import Publisher from "../../assembly/Publisher2";
//import Cam from "../../assembly/Cam";

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

  var componentList = ['Michelson_KM100', 'Michelson_linear', 'Michelson_laser', 'Michelson_LaserPower', 'Michelson_cam', 'Michelson_heater', 'Cam_1', 'Michelson_glas']
  return (
    <div>
      {/* KM100 */}
      {props.selected.has(componentList[0]) && (
        <KM100
          title="Mirror"
          id={componentList[0]}
          rotationTop={zero}
          rotationBottom={zero}
          footer={footer}
          top={topHigh}
          left={leftLeft}
        />
      )}
      {/* Linear stage */}
      {props.selected.has(componentList[1]) && (
        <SM1ZP
          title="Mirror Stage"
          id={componentList[1]}
          footer={footer}
          rotation={zero}
          top={topMiddle}
          left={leftMiddle}
        />
      )}
      {/* Laser ctrl */}
      {props.selected.has(componentList[2]) && (
        <KM100
          title="Laser"
          id={componentList[2]}
          rotationTop={zero}
          rotationBottom={zero}
          footer={footer}
          top={topMiddle}
          left={leftMiddleRight}
        />
      )}
      {/* Laser power */}
      {props.selected.has(componentList[3]) && (
        <LaserCtrl
          title="Power Supply"
          id={componentList[3]}
          footer={footer}
          top={topHigh}
          left={leftRight}
        />
      )}
      {/* Cam1 */}
      {props.selected.has(componentList[4]) && (
        <Cam1
          title="Screen"
          id={componentList[4]}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}
      {/* Heater */}
      {props.selected.has(componentList[3]) && (
        <Heater
          title="Heater"
          id={componentList[3]}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}

      {/* Cam 1 */}
      {props.selected.has(componentList[6]) && (
        <Cam2
          title="Cam_1"
          id={componentList[6]}
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}


      {/* Glas */}
      {props.selected.has(componentList[7]) && (
        <Glas
          title="Glas"
          id={componentList[7]}
          footer={footer}
          top={topMiddle}
          left={halfWidth}
        />
      )}
    </div>
  );
};

export default MichelsonInterferometer;