import { Button, Box } from '@mui/material';
import styles from '../CSS/Description.module.css';
import { themeLogin } from '../../UI/templates/Theme'
import { ThemeProvider } from '@mui/material/styles';


const DescriptionESPCam = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The editorial responsibility for this application lies with the Executive Office of the Abbe Center of Photonics and it's representative/s.
                </p>
                <p>
                    For further information please follow the links:
                </p>
                <ThemeProvider theme={themeLogin}>

                    <Box sx={{ '& button': { mr: 5, ml: 3 } }}>

                        <Button type='submit' variant='contained' onClick={() => { window.open("https://www.asp.uni-jena.de/legal-notice", 'resizable=yes') }}> Legal Notice </Button>
                        <Button type='submit' variant='contained' onClick={() => { window.open("https://www.uni-jena.de/en/privacy-statement", 'resizable=yes') }}> Privacy Statement </Button>
                    </Box>
                </ThemeProvider>
            </div>

        </div>
    )
}
export default DescriptionESPCam;
