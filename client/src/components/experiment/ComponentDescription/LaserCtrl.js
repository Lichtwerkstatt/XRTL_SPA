import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * LaserCtrl window content 
 * 
 * @description This file contains the descriptive text for the window of the LaserCtrl, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the LaserCtrl
 */
const DescriptionLaserCtrl = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    A coherent light source such as a laser is used to illuminate the interferometer. When light waves are coherent, their peaks and troughs line up perfectly, resulting in a pattern of
                    constructive and destructive interference that can produce beautiful and complex interference patterns. In contrast, light that is not coherent has randomly varying phases and does not
                    produce well-defined interference patterns.
                </p>
            </div>

        </div>
    )
}
DescriptionLaserCtrl.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionLaserCtrl;
