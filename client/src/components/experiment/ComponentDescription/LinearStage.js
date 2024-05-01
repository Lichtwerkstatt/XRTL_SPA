import styles from './CSS/Description.module.css'
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * Linear Stage window content 
 * 
 * @description This file contains the descriptive text for the window of the linear stage, which can be seen within the component window on the information icon.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} descriptive text of the linear stage
 */
const DescriptionLinearStage = (props) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    {t('descriptions.linear_stage')}
                </p>
            </div>

        </div>
    );
};

DescriptionLinearStage.propTypes = {
    height: propTypes.string.isRequired,
};
export default DescriptionLinearStage;