import ID15 from "../../assembly/ID15";
import KM100 from "../../assembly/KM100"
import Stream from "../../assembly/Stream";

const DigiLabs4YouDemo = (props) => {
  return (
    <div>
      {props.selected.has("KM100_1") &&(
        <KM100
          title="Mirror"
          id="KM100_1"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="100"
          left="100"
          />
      )}
      {props.selected.has("iris") && (
        <ID15
          title="Iris"
          id="iris"
          sliderPos="0"
          top="150"
          left="150"
        />
      )}
      {props.selected.has("screen") && (
        <Stream
          title="Camera"
          id="screen"
          top="100"
          left="100"
        />
      )}

    </div>
  )
}

export default DigiLabs4YouDemo;