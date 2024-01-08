import MultiComponentSelection from "../../assembly/MultiComponentSelection";
import DescriptionOnlyComponent from "../../assembly/DescriptionOnly";
import ESPCam from "../../assembly/ESPCamStream";
import Heater from "../../assembly/Heater";
import Rotary from "../../assembly/Rotary";
import Laser from "../../assembly/Laser";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";

/**
 * Experiment Setup Component
 *
 * @description Within this React component, all experiment components are intialised and the renderings of their windows, if selected, are handled.
 * In addition, important variables are passed to the individual components.
 *
 * @param {Set} selected - Set contains the controlIds of the component windows that are currently opened/rendered
 * 
 * @example 
          {props.selected.has(// general controlId) && ( // handles the renderings of the window, if the variable selected includes the controlId 
          <COMPONENT  
          title= // Title within the topper of the component window
          id={// general controlId of the component}
          controlIdTop={// controlId for the upper stepper motor}
          controlIdBottom={// controlId for the lower stepper motor}
          top={// Positioning at the height of the window}
          left={// Positioning at the width of the window}
        />
        )}
 *
 * @returns {React.ReactElement} Experiment setup component
 */
const MichelsonInterferometer = (props) => {
  return (
    <div>
      {/* Cam1 */}
      {props.selected.has("screen") && (
        <ESPCam title="Screen" id={"screen"} top={50} left={50} />
      )}

      {/* KM100 */}
      {props.selected.has("KM100_1") && (
        <KM100
          title="Reference Mirror"
          id={"KM100_1"}
          controlIdTop={"KM100_top_1"}
          controlIdBottom={"KM100_bottom_1"}
          top={50}
          left={1400}
        />
      )}

      {/* Linear stage */}
      {props.selected.has("linear_1") && (
        <SM1ZP
          title="Linear Movable Mirror"
          controlId={"linear_1"}
          top={100}
          left={1350}
        />
      )}

      {/* Rotary stage plate*/}
      {props.selected.has("plate_rotation") && (
        <Rotary
          title="Glass Plate Rotation Stage"
          controlId={"plate_rotation"}
          top={150}
          left={1300}
        />
      )}

      {/* Rotary stage Measurement Mirror*/}
      {props.selected.has("heater_rotation") && (
        <Rotary
          title="Mirror Changing Stage"
          controlId={"heater_rotation"}
          top={200}
          left={1250}
        />
      )}

      {/* Laser ctrl */}
      {props.selected.has("greenlaser_1") && (
        <KM100
          title="Laser Alignment"
          id={"greenlaser_1"}
          controlIdTop={"greenlaser_top_1"}
          controlIdBottom={"greenlaser_bottom_1"}
          top={250}
          left={1200}
        />
      )}

      {/* Laser power */}
      {props.selected.has("greenlaserPower_1") && (
        <Laser
          title="Power Supply"
          id={"greenlaserPower_1"}
          controlId={"greenlaser_1"}
          top={300}
          left={1150}
        />
      )}

      {/* Heater */}
      {props.selected.has("heater") && (
        <Heater
          title="Heatable Mirror Stage"
          id={"heater"}
          controlIdHeater={"heater"}
          controlIdThermistor={"thermistor"}
          top={500}
          left={50}
        />
      )}

      {/* Multi component slection (pinhole, beam splitter, red & white LED) */}
      {props.selected.has("experimentSelection") && (
        <MultiComponentSelection
          title="Multi Component Selection"
          controlId={"experimentSelection"}
          controlId2={"pinhole"}
          controlLED={"redLED"}
          controlLED2={"whiteLED"}
          top={350}
          left={1100}
        />
      )}

      {/* Lens */}
      {props.selected.has("lens") && (
        <DescriptionOnlyComponent
          title="Lens"
          controlId={"lens"}
          top={400}
          left={1050}
        />
      )}

      {/* BeamSplitter Cube */}
      {props.selected.has("bscube") && (
        <DescriptionOnlyComponent
          title="Beam Splitter"
          controlId={"bscube"}
          top={450}
          left={1000}
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;
