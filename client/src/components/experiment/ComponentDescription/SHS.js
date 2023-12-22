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
                    Shack-Hartmann-Sensor Description
                </p>
            </div>

        </div>
    );
};
DescriptionSHS.propTypes = {
  height: propTypes.string.isRequired,
};
export default DescriptionSHS;
