import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Prism window content 
 * 
 * @description This file contains the descriptive text for the window of the prism, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the prism
 */
const DescriptionPrism = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This prism together with the retroreflector mounted on the linear translation stage forms an optical delay line.
                </p>
            </div>

        </div>
    );
};

DescriptionPrism.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionPrism;