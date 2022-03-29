import ID15 from "../../assembly/ID15";
import KM100 from "../../assembly/KM100"
import LaserCtrl from "../../assembly/LaserCtrl";
import Stream from "../../assembly/Stream";

const DigiLabs4YouDemo = (props) => {
  return (
    <div>
      {props.selected.has("KM100_2") && (
        <KM100
          title="Mirror"
          id="KM100_2"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="100"
          left="100"
        />
      )}
      {props.selected.has("ID25_1") && (
        <ID15
          title="Iris"
          id="ID25_1"
          sliderPos="0"
          top="150"
          left="150"
        />
      )}
      {props.selected.has("ESP32Cam_1") && (
        <Stream
          title="Camera"
          id="ESP32Cam_1"
          top="100"
          left="100"
        />
      )}
      {props.selected.has("laser_1") && (
        <LaserCtrl
          title="Laser"
          id="laser_1"
          top="120"
          left="120"
        />
      )}

    </div>
  )
}
export default DigiLabs4YouDemo;