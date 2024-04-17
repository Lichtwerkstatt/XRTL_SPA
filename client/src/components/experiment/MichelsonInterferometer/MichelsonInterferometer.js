import ESPCam from "../../assembly/ESPCam";
import LaserCtrl from "../../assembly/Laser";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import DescriptionOnly from "../../assembly/DescriptionOnly";
import BeamBlocker from "../../assembly/BeamBlocker";

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
      {/* KM100 */}
      {props.selected.has("KM100_1") && (
        <KM100
          title="Reference Mirror"
          id={"KM100_1"}
          controlIdTop={"KM100_top_1"}
          controlIdBottom={"KM100_bottom_1"}
          top={570}
          left={500}
        />
      )}

      {/* Linear stage */}
      {props.selected.has("linear_1") && (
        <SM1ZP
          title="Linear Movable Mirror"
          controlId={"linear_1"}
          top={50}
          left={100}
        />
      )}

      {/* Laser ctrl */}
      {props.selected.has("greenlaser_1") && (
        <KM100
          title="Laser Alignment"
          id={"greenlaser_1"}
          controlIdTop={"greenlaser_top_1"}
          controlIdBottom={"greenlaser_bottom_1"}
          top={550}
          left={1550}
        />
      )}

      {/* Laser power */}
      {props.selected.has("greenlaserPower_1") && (
        <LaserCtrl
          title="Power Supply"
          id={"greenlaserPower_1"}
          controlId={"greenlaser_1"}
          top={100}
          left={1500}
        />
      )}

      {/* Cam1 */}
      {props.selected.has("screen") && (
        <ESPCam title="Screen" controlId={"screen"} top={50} left={600} />
      )}

      {/* Beamsplitter */}
      {props.selected.has("beamSplitter") && (
        <BeamBlocker
          title="Retract. Beam Splitter"
          id={"beamSplitter"}
          controlId={"beamSplitter"}
          top={600}
          left={850}
        />
      )}

      {/* Beamblocker 1 */}
      {props.selected.has("beamblocker1") && (
        <BeamBlocker
          title="Retract. Beam Blocker 1"
          id={"beamblocker1"}
          controlId={"servo_bblock_1"}
          top={600}
          left={250}
        />
      )}

      {/* Beamblocker 2 */}
      {props.selected.has("beamblocker2") && (
        <BeamBlocker
          title="Retract. Beam Blocker 2"
          id={"beamblocker2"}
          controlId={"servo_bblock_2"}
          top={600}
          left={550}
        />
      )}

      {/* Lens */}
      {props.selected.has("lens") && (
        <DescriptionOnly 
          title="Lens" 
          id={"lens"}
          controlId={"lens"} 
          top={550} 
          left={1200} 
        />
      )}

      {/* BeamSplitter Cube */}
      {props.selected.has("bscube") && (
        <DescriptionOnly 
          title="Beam Splitter"
          id={"bscube"} 
          controlId={"bscube"} 
          top={450} 
          left={100} 
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;
