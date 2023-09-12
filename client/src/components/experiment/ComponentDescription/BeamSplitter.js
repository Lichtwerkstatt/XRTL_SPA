import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Beam Splitter window content 
 * 
 * @description This file contains the descriptive text for the window of the beam splitter, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the beam splitter
 */
const DescriptionBeamSplitter = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The beam splitter is a partially reflective surface that splits the incoming beam of light into two separate beams.
                    This plate beam splitter transmits about 90 percent of the incident laser light and reflects the other 10 percent.
                </p>
            </div>

        </div>
    );
};

DescriptionBeamSplitter.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionBeamSplitter;