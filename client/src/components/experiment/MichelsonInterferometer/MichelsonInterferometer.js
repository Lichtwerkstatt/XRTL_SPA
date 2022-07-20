import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import Cam1 from "../../assembly/Stream";
import LaserCtrl from "../../assembly/LaserCtrl";

const MichelsonInterferometer = (props) => {
  let footer = "Initializing..."
  var height = window.innerHeight;
  var width = window.innerWidth;
  var halfWidth = width / 2;

  var topHigh = String(height - (height / 3 * 2.7))
  var topHighMiddle = String(height - (height / 2))
  var topMiddle = String(height - (height / 2.15))
  var leftLeft = String(width - (halfWidth * 1.9))
  var leftMiddle = String(width - (halfWidth * 1.8))
  var leftRight = String(width - (halfWidth * 0.4))
  var leftMiddleRight = String(width - (halfWidth * 0.4))
  var leftCam = String(width - (halfWidth * 1.5))

  return (
    <div>
      {props.selected.has("Michelson_KM100") && (
        <KM100
          title="Mirror"
          id="Michelson_KM100"
          rotationTop="0"
          rotationBottom="0"
          footer={footer}
          top={topHigh}
          left={leftLeft}
        />
      )}
      {props.selected.has("Michelson_linear") && (
        <SM1ZP
          title="Mirror Stage"
          id="Michelson_linear"
          footer={footer}
          rotation="0"
          top={topMiddle}
          left={leftMiddle}
        />
      )}
      {props.selected.has("Michelson_laser") && (
        <KM100
          title="Laser"
          id="Michelson_laser"
          rotationTop="0"
          rotationBottom="0"
          footer={footer}
          top={topMiddle}
          left={leftMiddleRight}
        />
      )}
      {props.selected.has("Michelson_cam") && (
        <Cam1
          title="Screen"
          id="Michelson_cam"
          footer={footer}
          top={topHighMiddle}
          left={leftCam}
        />
      )}
      {props.selected.has("Michelson_LaserPower") && (
        <LaserCtrl
          title="Power Supply"
          id="Michelson_LaserPower"
          footer={footer}
          top={topHigh}
          left={leftRight}
        />
      )}
    </div>
  );
};

export default MichelsonInterferometer;
