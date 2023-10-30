import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * ESPCam window content 
 * 
 * @description This file contains the descriptive text for the window of the ESPCam, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the ESPCam
 */
const DescriptionESPCam = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>The screen in a Michelson interferometer setup displays an interference pattern consisting of bright and dark fringes. The location and spacing of these fringes provide information
                    about the relative phase difference between the two light paths, which can be used to measure small changes in the optical path length of the sample beam.
                </p>
            </div>

        </div>
    )
}
DescriptionESPCam.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionESPCam;
