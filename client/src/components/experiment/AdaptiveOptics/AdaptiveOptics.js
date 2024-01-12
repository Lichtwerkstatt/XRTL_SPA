import DescriptionOnlyComponent from "../../assembly/DescriptionOnly";
import Screen from "../../assembly/RetracatableScreen";
import ESPCam from "../../assembly/ESPCamStream";
import Pinhole from "../../assembly/Pinhole";
import LaserCtrl from "../../assembly/Laser";
import Rotary from "../../assembly/Rotary";
import KM100 from "../../assembly/KM100";
import XR50P from "../../assembly/XR50P";
import Eye from "../../assembly/Eye";

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
const AdaptiveOptics = (props) => {

  return (
    <div>
      {/* KM100 */}
      {props.selected.has("KM100B_1") && (
        <KM100
          title="Prism Mount"
          id={"KM100B_1"}
          controlIdTop={"KM100B_top_1"}
          controlIdBottom={"KM100B_bottom_1"}
          top={600}
          left={920}
        />
      )}

      {/* Linear stage */}
      {props.selected.has("stepper_linear1") && (
        <XR50P
          title="Linear Stage"
          controlId={"stepper_linear1"}
          top={650}
          left={1000}
        />
      )}

      {/* Laser ctrl */}
      {props.selected.has("redlaser_1") && (
        <KM100
          title="Laser Alignment"
          id={"redlaser_1"}
          controlIdTop={"redlaser_top_1"}
          controlIdBottom={"redlaser_bottom_1"}
          top={450}
          left={1600}
        />
      )}

      {/* Laser power */}
      {props.selected.has("relay_laser") && (
        <LaserCtrl
          title="Power Supply"
          id={"relay_laser"}
          controlId={"relay_laser"}
          top={570}
          left={50}
        />
      )}

      {/* Pinhole */}
      {props.selected.has("stepper_pinhole") && (
        <Pinhole
          title="Pinhole"
          controlId={"stepper_pinhole"}
          top={600}
          left={400}
        />
      )}

      {/* Phantom eye*/}
      {props.selected.has("eye_1") && (
        <Eye
          title="Artificial Eye"
          id={"eye_1"}
          controlIdTop={"stepper_eye_diop"}
          controlIdBottom={"stepper_eye_pupil"}
          top={40}
          left={400}
        />
      )}

      {/* Rotary stage of the eye*/}
      {props.selected.has("stepper_rotation") && (
        <Rotary
          title="Target Changing Stage"
          controlId={"stepper_rotation"}
          top={100}
          left={80}
        />
      )}
      {/* Beam Splitter*/}
      {props.selected.has("beamSplitter") && (
        <DescriptionOnlyComponent
          title="Beam Splitter"
          controlId={"beamSplitter"}
          top={350}
          left={1250}
        />
      )}
      {/* Prism*/}
      {props.selected.has("prism") && (
        <DescriptionOnlyComponent
          title="Prism"
          controlId={"prism"}
          top={50}
          left={1250}
        />
      )}
      {/* Telescope in front of the Adaptive Mirror */}
      {props.selected.has("telescope_1") && (
        <DescriptionOnlyComponent
          title="Telescope 1"
          controlId={"telescope_1"}
          top={50}
          left={1600}
        />
      )}

      {/* Telescope in front of the Wavefront Sensor*/}
      {props.selected.has("telescope_2") && (
        <KM100
          title="Telescope 2"
          id={"telescope_2"}
          controlIdTop={"stepper_tele_x"}
          controlIdBottom={"stepper_tele_y"}
          top={500}
          left={1550}
        />
      )}
      {/* Screen Retraction*/}
      {props.selected.has("servo_screen") && (
        <Screen
          title="Screen Retraction"
          controlId={"servo_screen"}
          top={550}
          left={700}
        />
      )}
      {/* Adaptive Mirror*/}
      {props.selected.has("mirror_1") && (
        <DescriptionOnlyComponent
          title="Adaptive Mirror"
          controlId={"mirror_1"}
          top={650}
          left={1280}
        />
      )}
      {/* Shack-Hartmann-Sensor*/}
      {props.selected.has("wavesensor_1") && (
        <KM100
          title="Wavefront Sensor"
          id={"wavesensor_1"}
          controlIdTop={"stepper_sensor_a"}
          controlIdBottom={"stepper_sensor_b"}
          top={50}
          left={750}
        />
      )}
      {/* Screen*/}
      {props.selected.has("cam_screen") && (
        <ESPCam
          title="Screen"
          id={"cam_screen"}
          top={50}
          left={550}
        />
      )}
    </div>
  );
};
export default AdaptiveOptics;
