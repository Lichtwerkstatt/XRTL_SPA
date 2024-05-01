import LaserCtrl from "../../assembly/Laser";
import { RELAY_G_LASER, RELAY_R_LASER, STEPPER_ROT_LASER } from "../../../services/constants/components";
import { useTranslation } from "react-i18next";

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
    const { t} = useTranslation();

    let footer = t('initializing');

    return (
        <div>
            {/* Power Supply G */}
            {props.selected.has(RELAY_G_LASER) && (
                <LaserCtrl
                    title={t('components.' + RELAY_G_LASER)}
                    id={RELAY_G_LASER}
                    controlId={RELAY_G_LASER}
                    footer={footer}
                    top={200}
                    left={400}
                />
            )}

            {/* Power Supply R */}
            {props.selected.has(RELAY_R_LASER) && (
                <LaserCtrl
                    title={t('components.' + RELAY_R_LASER)}
                    id={RELAY_R_LASER}
                    controlId={RELAY_R_LASER}
                    footer={footer}
                    top={100}
                    left={200}
                />
            )}

            {/* Rotation Laser */}
            {props.selected.has(STEPPER_ROT_LASER) && (
                <LaserCtrl
                    title={t('components.' + STEPPER_ROT_LASER)}
                    id={STEPPER_ROT_LASER}
                    controlId={STEPPER_ROT_LASER}
                    footer={footer}
                    top={100}
                    left={800}
                />
            )}
        </div>
    );
};
export default Fundamentals;
