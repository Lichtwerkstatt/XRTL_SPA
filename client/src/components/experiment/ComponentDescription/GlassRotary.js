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
                This rotational mount allows for two acrylic glass plates to be moved in and out of the Laser beam and to precisely tune the angle of incidence. By measuring the change in the optical way for different angles with the interferometer and comparing it to the change in the geometric way, the refracive index of the used material can be derived.
                </p>
            </div>

        </div>
    )
}

DescriptionGlasPlateRotation.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionGlasPlateRotation;