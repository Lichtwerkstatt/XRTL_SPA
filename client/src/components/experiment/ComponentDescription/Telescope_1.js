import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Telescope 1 window content 
 * 
 * @description This file contains the text for the window of the first telescope, which can be seen within the component window when clicking on telescope 1.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} Content for the telescope 1 component window .  
 */ 
const DescriptionTelescope1 = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    Telescope 1 Description
                </p>
            </div>

        </div>
    )
}

DescriptionTelescope1.propTypes = {
    height: propTypes.string.isRequired,
}
export default DescriptionTelescope1;