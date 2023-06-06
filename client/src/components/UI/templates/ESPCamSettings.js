import { ThemeProvider } from '@mui/material/styles';
import styles from '../CSS/Settings.module.css';
import { theme } from '../templates/Theme.js';
import Slider from '../templates/SliderCtrl';
import Switch from '../templates/Switch';
import Select from '../templates/Select';
import Box from '@mui/material/Box';

const ESPCamSettings = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.Settings}>
                <Box sx={{ m: 2, width: 250 }} > <h1>Settings</h1> </Box>
                <Select title='Resolution' component={props.component} online={props.online} option='frameSize' selectValue={props.frameSize}/>
                <Switch component={props.component} switchStatus={props.switchIsOn} online={props.online} start='Color' end='Gray' option='gray' />
                <Slider title='Contrast' component={props.component} online={props.online} sliderValue={props.contrast} min={-2} max={2} option='contrast' />
                <Slider title='Exposure' component={props.component} online={props.online} sliderValue={props.exposure} min={0} max={1200} option='exposure' />
            </div>
        </ThemeProvider>
    )
}
export default ESPCamSettings;