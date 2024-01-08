import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * KM100 window content 
 * 
 * @description This file contains the descriptive text for the window of the KM100, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the KM100
 */
const DescriptionKM100 = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The two beams of light are reflected by mirrors placed at a 90-degree angle to each other. This mirror is used to reflect the reference beam. The kinematic mirror mount is designed to
                    securely hold a mirror in place while allowing fine tip and tilt adjustments.

                </p>
            </div>

        </div>
    )
}
DescriptionKM100.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionKM100;