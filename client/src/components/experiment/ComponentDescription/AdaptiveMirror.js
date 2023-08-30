import styles from "./CSS/Description.module.css";
import propTypes from "prop-types";
import DM from "../../assembly/media/DM_outline_center.png"

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
            <div className={styles.mainWrapper} style={{ height: props.height, background: 'url(' + DM + ')' }} >
                <p>
                    Adaptive mirror Description
                </p>
            </div>

        </div>
    );
};
DescriptionAdaptiveMirror.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionAdaptiveMirror;
