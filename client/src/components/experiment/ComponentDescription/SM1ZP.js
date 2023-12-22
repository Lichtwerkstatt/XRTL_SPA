import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * SM1ZP window content 
 * 
 * @description This file contains the descriptive text for the window of the SM1ZP, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the SM1ZP
 */
const DescriptionSM1ZP = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The two beams of light are reflected by mirrors placed at a 90-degree angle to each other. This mirror is used to reflect the sample beam. The translation mount is designed to securely
                    hold a mirror in place while offering repeatable linear travel using the precision micrometer actuator, which is graduated in 1 µm increments. This component is used to create a
                    quantifiable change in the path length of the sample beam.
                </p>
            </div>

        </div>
    )
}
DescriptionSM1ZP.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionSM1ZP;
