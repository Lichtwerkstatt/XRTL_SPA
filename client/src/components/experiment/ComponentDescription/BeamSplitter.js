import styles from './CSS/Description.module.css'
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * Beam Splitter window content 
 * 
 * @description This file contains the descriptive text for the window of the beam splitter, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the beam splitter
 */
const DescriptionBeamSplitter = (props) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>{t('descriptions.beam_splitter')}</p>
            </div>

        </div>
    );
};

DescriptionBeamSplitter.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionBeamSplitter;