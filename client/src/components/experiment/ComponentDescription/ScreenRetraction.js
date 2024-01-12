import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * ScreenRetraction window content 
 * 
 * @description This file contains the descriptive text for the window of the ScreenRetraction, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the ScreenRetraction 
 */
const DescriptionScreenRetraction = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This servo allows to move the screen in and out of the image plane to observe a real image of an object in the object plane.
                </p>
            </div>

        </div>
    );
};

DescriptionScreenRetraction.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionScreenRetraction;