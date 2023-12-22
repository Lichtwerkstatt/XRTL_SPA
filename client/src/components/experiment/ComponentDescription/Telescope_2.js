import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Telescope 2 window content 
 * 
 * @description This file contains the text for the window of the second telescope, which can be seen within the component window when clicking on telescope 2.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} Content for the telescope 2 component window .  
 */
const DescriptionTelescope2 = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This telescope with its image size-changing effect is used to fully utilize the area of the wavefront sensor.
                </p>
            </div>

        </div>
    )
}
DescriptionTelescope2.propTypes = {
    height: propTypes.string.isRequired,
}
export default DescriptionTelescope2;