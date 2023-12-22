import DescriptionOnlyComponent from "../../assembly/DescriptionOnly";
import Screen from "../../assembly/RetracatableScreen";
import LaserCtrl from "../../assembly/Laser";
import KM100 from "../../assembly/KM100";

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
          footer={// Intialisation text of the footer}
          top={// Positioning at the height of the window}
          left={// Positioning at the width of the window}
        />
        )}
 *
 * @returns {React.ReactElement} Experiment setup component
 */
const Fundamentals = (props) => {
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

      {/* Beam Splitter*/}
      {props.selected.has("beamSplitter") && (
        <DescriptionOnlyComponent
          title="Beam Splitter"
          controlId={"beamSplitter"}
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



    </div>
  );
};
export default Fundamentals;
