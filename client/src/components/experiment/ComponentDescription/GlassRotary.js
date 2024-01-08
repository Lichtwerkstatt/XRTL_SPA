import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Glas plate rotation window content 
 * 
 * @description This file contains the descriptive text for the window of the glas plate rotation, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the  glas plate rotation 
 */
const DescriptionGlasPlateRotation = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                Glas plate rotation description  :)

                </p>
            </div>

        </div>
    )
}

DescriptionGlasPlateRotation.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionGlasPlateRotation;