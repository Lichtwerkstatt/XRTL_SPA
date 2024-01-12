import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Retractable Screen window content 
 * 
 * @description This file contains the descriptive text for the window of the retractable screen, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the retractable screen 
 */
const DescriptionScreen = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This screen is used to visualize the resulting image after the delay line.
                </p>
            </div>

        </div>
    );
};

DescriptionScreen.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionScreen;