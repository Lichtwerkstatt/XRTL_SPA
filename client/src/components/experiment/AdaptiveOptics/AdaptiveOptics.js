import DescriptionOnlyComponent from "../../assembly/DescriptionOnly";
import Pinhole from "../../assembly/Pinhole";
import LaserCtrl from "../../assembly/Laser";
import Rotary from "../../assembly/Rotary";
import KM100 from "../../assembly/KM100";
import XR50P from "../../assembly/XR50P";
import Eye from "../../assembly/Eye";
import Screen from "../../assembly/Screen";

/**
 * Experiment setup component
 *
 * @description Within this React component, all experiment components are intialised and the renderings of their windows, if selected, are handled.
 * In addition, important variables are passed to the individual components.
 *
 * @param {Set} selected - Set contains the controlIds of the component windows that are currently opened/rendered
 *
 * @returns {React.ReactElement} Experiment setup component
 */
const AdaptiveOptics = (props) => {
  let footer = "Initializing...";

  return (
    <div>
      {/* KM100 */}
      {props.selected.has("KM100B_1") && (
        <KM100
          title="Prism Mount"
          id={"KM100B_1"}
          controlIdTop={"KM100B_top_1"}
          controlIdBottom={"KM100B_bottom_1"}
          footer={footer}
          top={600}
          left={920}
        />
      )}

      {/* Delay line */}
      {props.selected.has("stepper_linear1") && (
        <XR50P
          title="Linear Stage"
          controlId={"stepper_linear1"}
          footer={footer}
          top={600}
          left={100}
        />
      )}

      {/* Laser ctrl */}
      {props.selected.has("redlaser_1") && (
        <KM100
          title="Laser Alignment"
          id={"redlaser_1"}
          controlIdTop={"redlaser_top_1"}
          controlIdBottom={"redlaser_bottom_1"}
          footer={footer}
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
          footer={footer}
          top={50}
          left={1600}
        />
      )}

      {/* Pinhole */}
      {props.selected.has("stepper_pinhole") && (
        <Pinhole
          title="Pinhole"
          controlId={"stepper_pinhole"}
          footer={footer}
          top={100}
          left={1100}
        />
      )}

      {/* Phantom eye*/}
      {props.selected.has("eye_1") && (
        <Eye
          title="Artificial Eye"
          id={"eye_1"}
          controlIdTop={"stepper_eye_diop"}
          controlIdBottom={"stepper_eye_pupil"}
          footer={footer}
          top={50}
          left={150}
        />
      )}

      {/* Rotary stage of the eye*/}
      {props.selected.has("stepper_rotation") && (
        <Rotary
          title="Target Changing Stage"
          controlId={"stepper_rotation "}
          footer={footer}
          top={550}
          left={150}
        />
      )}

      {/* Telescope in front of the Adaptive Mirror */}
      {props.selected.has("telescope_1") && (
        <DescriptionOnlyComponent
          title="Telescope 1"
          controlId={"telescope_1"}
          footer={footer}
          top={550}
          left={900}
        />
      )}

      {/* Telescope in front of the Wavefront Sensor*/}
      {props.selected.has("telescope_2") && (
        <KM100
          title="Telescope 2"
          id={"telescope_2"}
          controlIdTop={"stepper_tele_x"}
          controlIdBottom={"stepper_tele_y"}
          footer={footer}
          top={50}
          left={150}
        />
      )}
      {/* Screen*/}
      {props.selected.has("servo_screen") && (
        <Screen
          title="Retractable Screen"
          controlId={"servo_screen"}
          footer={footer}
          top={50}
          left={150}
        />
      )}
      {/* Adaptive Mirror*/}
      {props.selected.has("mirror_1") && (
        <DescriptionOnlyComponent
          title="Adaptive Mirror"
          controlId={"mirror_1"}
          footer={footer}
          top={50}
          left={150}
        />
      )}
      {/* Shack-Hartmann-Sensor*/}
      {props.selected.has("wavesensor_1") && (
        <KM100
          title="Wavefront Sensor"
          id={"wavesensor_1"}
          controlIdTop={"stepper_sensor_a"}
          controlIdBottom={"stepper_sensor_b"}
          footer={footer}
          top={50}
          left={150}
        />
      )}
    </div>
  );
};
export default AdaptiveOptics;
