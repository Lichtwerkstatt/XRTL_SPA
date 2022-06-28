import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import Cam1 from "../../assembly/Stream";
import LaserCtrl from "../../assembly/LaserCtrl";


const MichelsonInterferometer = (props) => {
  return (
    <div>
      {props.selected.has("Michelson_KM100") && (
        <KM100
          title="Mirror"
          id="Michelson_KM100"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="50"
          left="50"
        />
      )}
      {props.selected.has("Michelson_linear") && (
        <SM1ZP
          title="Mirror Stage"
          id="Michelson_linear"
          rotation="0"
          top="400"
          left="100"
        />
      )}
      {props.selected.has("Michelson_laser") && (
        <KM100
          title="Laser"
          id="Michelson_laser"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="50"
          left="350"
        />
      )}
      {props.selected.has("Michelson_cam") && (
        <Cam1
          title="Screen"
          id="Michelson_cam"
          top="150"
          left="150"
          footer="Start streaming ..."
        />
      )}
      {props.selected.has("Michelson_LaserPower") && (
        <LaserCtrl
          title="Power Supply"
          id="Michelson_LaserPower"
          footer="Initializing..."
          top="180"
          left="200"
        />
      )}
    </div>
  );
};

export default MichelsonInterferometer;
