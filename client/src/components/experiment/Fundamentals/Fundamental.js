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
            {/* Power Supply G */}
            {props.selected.has("relay_g_laser") && (
                <LaserCtrl
                    title="Power Supply G"
                    id={"relay_g_laser"}
                    controlId={"relay_g_laser"}
                    footer={footer}
                    top={200}
                    left={400}
                />
            )}

            {/* Power Supply R */}
            {props.selected.has("relay_r_laser") && (
                <LaserCtrl
                    title="Power Supply R"
                    id={"relay_r_laser"}
                    controlId={"relay_r_laser"}
                    footer={footer}
                    top={100}
                    left={200}
                />
            )}

            {/* Rotation Laser */}
            {props.selected.has("stepper_rot_laser") && (
                <LaserCtrl
                    title="Rotation Laser"
                    id={"stepper_rot_laser"}
                    controlId={"stepper_rot_laser"}
                    footer={footer}
                    top={100}
                    left={800}
                />
            )}
        </div>
    );
};
export default Fundamentals;
