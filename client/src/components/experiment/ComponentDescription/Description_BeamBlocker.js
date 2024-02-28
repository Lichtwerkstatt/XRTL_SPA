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
                    This really simple plate beam blocker can be used to block the laser beam in one of the two arms of the Michelson interferometer. 
                    <br/>
                    <br/>
                    If one of the arms is blocked, only one beam reaches the screen and no diffraction pattern can be observed.
                </p>
            </div>

        </div>
    )
}
DescriptionBeamSplitter.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionBeamSplitter;
