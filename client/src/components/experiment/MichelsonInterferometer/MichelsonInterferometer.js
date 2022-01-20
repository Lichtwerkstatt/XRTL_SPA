import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import Cam1 from "../../assembly/Stream";


const MichelsonInterferometer = (props) => {
  return (
    <div>
      {props.selected.has("KM100_1") && (
        <KM100
          title="Mirror"
          id="KM100_1"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="200"
          left="20"
        />
      )}
      {props.selected.has("KM100_2") && (
        <KM100
          title="Mirror"
          id="KM100_2"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="200"
          left="520"
        />
      )}
      {props.selected.has("SM1ZP_1") && (
        <SM1ZP
          title="Mirror Stage"
          id="SM1ZP_1"
          rotation="0"
          top="200"
          left="820"
        />
      )}
      {props.selected.has("Cam_1") && (
        <Cam1
          title="Camera 1"
          id="Cam_1"
          rotation="0"
          top="200"
          left="820"
        />
      )}
    </div>
  );
};

export default MichelsonInterferometer;
