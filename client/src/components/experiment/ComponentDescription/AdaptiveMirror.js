import styles from "./CSS/Description.module.css";
import propTypes from "prop-types";

/**
 * Adaptive mirror window content
 *
 * @description This file contains the text for the window of the adaptive Mirror, which can be seen within the component window when clicking on adaptive mirror.
 *
 * @param {string} height - For scaling the content (is specified in pixels)
 *
 * @returns {React.ReactElement} Content for the Adaptive mirror component window .
 */
const DescriptionAdaptiveMirror = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                A piezoelectric adaptive mirror is a mirror with a surface that can be dynamically altered using piezoelectric actuators. These actuators respond to electrical signals, causing the mirror's shape to adjust and compensate for optical distortions measured by the Shack-Hartmann-Sensor in real-time.
                </p>
            </div>

        </div>
    );
};
DescriptionAdaptiveMirror.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionAdaptiveMirror;
