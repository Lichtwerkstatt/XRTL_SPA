import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * ExperimentSelection window content 
 * 
 * @description This file contains the descriptive text for the window of the ExperimentSelection, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the ExperimentSelection
 */
const DescriptionExperimentSelection = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    <h3>Beam Splitter:</h3>This really simple plate beam splitter is made of an acrylic glass sheet and can be used to observe the interference pattern created on the second output of the Michelson interferometer.
                </p>
                <p>
                    <h3>Pinhole:</h3>The pinhole has a diameter of 1mm and is used for easier adjustment. Remove before measurement!
                </p>
                <p>
                    <h3>Red LED:</h3>This 4mW, 635nm light emitting diode can be used to observe interference patterns from light sources with a short coherence length. In order to observe this phenomenon, the Michelson interferometer must be adjusted very precisely. In particular, the two beam paths must be exactly the same length.
                </p>
                <p>
                    <h3>White LED:</h3>This 15mW light emitting diode can be used to observe interference patterns from mixed wavelength light sources with an even shorter coherence length. In order to observe this phenomenon, the Michelson interferometer must be adjusted extremely precise. In particular, the two beam paths must be exactly the same length.
                </p>
            </div>

        </div>
    )
}

DescriptionExperimentSelection.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionExperimentSelection;