import { themeLogin } from '../../UI/templates/Theme';
import { ThemeProvider } from '@mui/material/styles';
import styles from './CSS/Description.module.css';
import { Button, Box } from '@mui/material';
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * Imprint text
 * 
 * @description Within this file is the text for the imprint, which can be found within the information window under the § symbol.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * 
 * @returns {React.ReactElement} Imprint text and buttons for redirection to websites.  
 */
const Imprint = (props) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    {t('imprint.main')}
                </p>
                <p>
                    {t('imprint.further')}
                </p>
                <ThemeProvider theme={themeLogin}>

                    <Box sx={{ '& button': { mr: 5, ml: 3 } }}>

                        <Button type='submit' variant='contained' onClick={() => { window.open("https://www.asp.uni-jena.de/legal-notice", 'resizable=yes') }}> {t('imprint.legal_link')} </Button>
                        <Button type='submit' variant='contained' onClick={() => { window.open("https://www.uni-jena.de/en/privacy-statement", 'resizable=yes') }}> {t('imprint.privacy_link')} </Button>
                    </Box>
                </ThemeProvider>
            </div>

        </div>
    )
}

Imprint.propTypes = {
    height: propTypes.string.isRequired,
}

export default Imprint;
