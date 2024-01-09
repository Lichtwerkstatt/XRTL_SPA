import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Heatable mirror stage window content 
 * 
 * @description This file contains the descriptive text for the window of the heatable mirror stage, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the heatable mirror stage 
 */
const DescriptionHeatableMirrorStage = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This mirror is mounted on an aluminum rod of 90mm length that is equiped with a heater and a thermal sensor. By changing the heater power and thus the temperature of the aluminum rod, the thermal expansion coefficient can be derived by observing the change in the interference pattern. 
                </p>
            </div>

        </div>
    )
}

DescriptionHeatableMirrorStage.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionHeatableMirrorStage;