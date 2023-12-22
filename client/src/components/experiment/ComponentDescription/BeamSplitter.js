import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Beamsplitter window content 
 * 
 * @description This file contains the descriptive text for the window of the Beamsplitter, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the Beamsplitter
 */
const DescriptionBeamSplitter = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This really simple plate beam splitter is made of an acrylic glass sheet and can be used to observe the interference pattern created on the second output of the Michelson interferometer.
                </p>
            </div>

        </div>
    )
}
DescriptionBeamSplitter.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionBeamSplitter;
