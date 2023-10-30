import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Laser window content 
 * 
 * @description This file contains the descriptive text for the window of the laser, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the laser
 */
const DescriptionLaser = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The laser power supply provides the electrical energy necessary to excite the laser medium and generate the coherent beam of light. The laser module here is a class 2 laser,
                    which does not require any protective eyewear. However, to avoid injury, do not look directly into the laser beam.
                </p>
            </div>

        </div>
    )
}

DescriptionLaser.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionLaser;
