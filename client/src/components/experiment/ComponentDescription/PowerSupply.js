import styles from './CSS/Description.module.css'
import propTypes from "prop-types";

/**
 * Power Supply window content 
 * 
 * @description This file contains the descriptive text for the window of the power supply, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the power supply 
 */
const DescriptionPowerSupply = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The laser power supply provides the electrical energy necessary to excite the laser medium and generate the coherent beam of light.
                    The laser module here is a class 3 laser, which requires a protective eyewear.
                </p>
            </div>

        </div>
    );
};

DescriptionPowerSupply.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionPowerSupply;