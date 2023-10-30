import styles from './CSS/Description.module.css';
import propTypes from "prop-types";

/**
 * Cube window content 
 * 
 * @description This file contains the descriptive text for the window of the cube, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the cube
 */
const DescriptionCube = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                The beam splitter is a partially reflective surface that splits the incoming beam of light into two separate beams, known as the reference beam and the sample beam. This cube beam 
                splitter is made up of two prisms that are cemented together.
                </p>
            </div>

        </div>
    )
}
DescriptionCube.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionCube;
