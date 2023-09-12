import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Linear Stage window content 
 * 
 * @description This file contains the descriptive text for the window of the linear stage, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the linear stage
 */
const DescriptionLinearStage = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This retroreflector mounted on the linear translation stage together with the prism forms an optical delay line.
                </p>
            </div>

        </div>
    );
};

DescriptionLinearStage.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionLinearStage;