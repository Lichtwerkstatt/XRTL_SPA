import styles from "./CSS/Description.module.css";
import propTypes from "prop-types";

/**
 * Shack-Hartmann-Sensor window content
 *
 * @description This file contains the text for the window of the Shack-Hartmann-Sensor, which can be seen within the component window when clicking on Shack-Hartmann-Sensor.
 *
 * @param {string} height - For scaling the content (is specified in pixels)
 *
 * @returns {React.ReactElement} Content for the Shack-Hartmann-Sensor component window .
 */
const DescriptionSHS = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }}>
                <p>
                The Shack-Hartmann wavefront sensor is a device used to measure the wavefront distortions of an optical system. It does so by dividing the incoming wavefront into small segments using an array of lenslets. The deviations in the local tilt of these segments are then analyzed to provide information about aberrations in the optical system.
                </p>
            </div>

        </div>
    );
};
DescriptionSHS.propTypes = {
  height: propTypes.string.isRequired,
};
export default DescriptionSHS;
