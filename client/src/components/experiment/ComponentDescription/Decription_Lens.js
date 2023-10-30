import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Lens window content 
 * 
 * @description This file contains the descriptive text for the window of the lens, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the lens
 */
const DescriptionLens = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The lens is used to diverge the beam of laser light in order to illuminate a larger area of the screen and thereby to obtain an interference pattern consisting of light and dark rings
                    (constructive or destructive interference, respectively). Without a lens, the laser would create only one spot on the screen, which is either very bright (constructive interference) or
                    completely gone (destructive interference).
                </p>
            </div>

        </div>
    )
}

DescriptionLens.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionLens;
