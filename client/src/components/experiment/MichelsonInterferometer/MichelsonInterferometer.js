import Beamsplitter from "../../assembly/BeamSplitter";
import ESPCam from "../../assembly/ESPCam";
import LaserCtrl from "../../assembly/Laser";
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import Cube from "../../assembly/BsCube";
import Lens from "../../assembly/Lens";

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
  // Set the scaling factor for better window placement on smaller screens
  var height = window.innerHeight / 955;
  var width = window.innerWidth / 1920;

  // Scaling of the setting height of the windows depending on the reference value
  const scaleComponenteWindowHeight = (value) => {
    return parseInt(height * value)
  }

  // Scaling of the setting left of the windows depending on the reference value
  const scaleComponenteWindowWidth = (value) => {
    value = parseInt(width * value)

    // prevents windows from being created outside or over the calculated screen width
    if ((value + 250) > window.innerWidth) {
      let dif = value + 275 - window.innerWidth;
      value = value - dif;
    }
    return value
  }

  return (
    <div>
      {/* KM100 */}
      {props.selected.has('KM100_1') && (
        <KM100
          title="Reference Mirror"
          id={'KM100_1'}
          controlIdTop={'KM100_top_1'}
          controlIdBottom={'KM100_bottom_1'}
          top={scaleComponenteWindowHeight(570)}
          left={scaleComponenteWindowWidth(500)}
        />
      )}
      {/* Linear stage */}
      {props.selected.has('linear_1') && (
        <SM1ZP
          title="Linear Movable Mirror"
          controlId={'linear_1'}
          top={scaleComponenteWindowHeight(50)}
          left={scaleComponenteWindowWidth(100)}
        />
      )}
      {/* Laser ctrl */}
      {props.selected.has('greenlaser_1') && (
        <KM100
          title="Laser Alignment"
          id={'greenlaser_1'}
          controlIdTop={'greenlaser_top_1'}
          controlIdBottom={'greenlaser_bottom_1'}
          top={scaleComponenteWindowHeight(550)}
          left={scaleComponenteWindowWidth(1550)}
        />
      )}
      {/* Laser power */}
      {props.selected.has('greenlaserPower_1') && (
        <LaserCtrl
          title="Power Supply"
          id={'greenlaserPower_1'}
          controlId={'greenlaser_1'}
          top={scaleComponenteWindowHeight(100)}
          left={scaleComponenteWindowWidth(1500)}

        />
      )}
      {/* Cam1 */}
      {props.selected.has('screen') && (
        <ESPCam
          title="Screen"
          controlId={'screen'}
          top={scaleComponenteWindowHeight(50)}
          left={scaleComponenteWindowWidth(600)}
        />
      )}

      {/* Beamsplitter */}
      {props.selected.has('beamSplitter') && (
        <Beamsplitter
          title="Retract. Beam Splitter"
          controlId={'beamSplitter'}
          top={scaleComponenteWindowHeight(600)}
          left={scaleComponenteWindowWidth(850)}
        />
      )}

      {/* Lens */}
      {props.selected.has('lens') && (
        <Lens
          title="Lens"
          controlId={'lens'}
          top={scaleComponenteWindowHeight(550)}
          left={scaleComponenteWindowWidth(1200)}
        />
      )}

      {/* BeamSplitter Cube */}
      {props.selected.has('bscube') && (
        <Cube
          title="Beam Splitter"
          controlId={'bscube'}
          top={scaleComponenteWindowHeight(450)}
          left={scaleComponenteWindowWidth(100)}
        />
      )}
    </div>
  );
};
export default MichelsonInterferometer;