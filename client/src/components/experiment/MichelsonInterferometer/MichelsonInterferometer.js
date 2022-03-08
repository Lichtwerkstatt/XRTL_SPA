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
          top="50"
          left="50"
        />
      )}
      {props.selected.has("KM100_2") && (
        <KM100
          title="Mirror"
          id="KM100_2"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="100"
          left="520"
        />
      )}
      {props.selected.has("SM1ZP_1") && (
        <SM1ZP
          title="Mirror Stage"
          id="SM1ZP_1"
          rotation="0"
          top="400"
          left="100"
        />
      )}
      {props.selected.has("Laser") && (
        <KM100
          title="Laser"
          id="Laser"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="50"
          left="350"
        />
      )}

      {props.selected.has("Screen") && (
        <Cam1
          title="Screen"
          id="Screen"
          rotation="0"
          top="150"
          left="150"
        />
      )}
    </div>
  );
};

export default MichelsonInterferometer;
