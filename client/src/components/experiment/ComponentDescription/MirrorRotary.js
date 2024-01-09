import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Mirror Changing Stage window content 
 * 
 * @description This file contains the descriptive text for the window of the mirror changing stage, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the mirror changing stage
 */
const DescriptionMirrorRotationStage = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This rotation stage allows to exchange the Linear Movable Mirror and the Heatable Mirror for the respective experiments.
                </p>
            </div>

        </div>
    )
}

DescriptionMirrorRotationStage.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionMirrorRotationStage;