import Slider from "./SliderCtrl";
import Switch from "./Switch"
import Select from "./Select";
import UpDownCtrl from "./UpDownCtrl"
import LeftRightCtrl from "./LeftRightCtrl";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "./Settings.module.css"

const Settings = (props) => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#01bd7d',
                main: '#01bd7d',
                dark: '#01bd7d',
                contrastText: '#01bd7d',
            },
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.UpDown}>
                <UpDownCtrl component={props.id} />
            </div>
            <div className={styles.LeftRight}>
                <LeftRightCtrl component={props.id} />
            </div>
            <Box sx={{ m: 2, width: 250 }} ><h1>Settings</h1> </Box>
            <Select title="Resolution" component={props.component} command="resolution" />
            <Switch component={props.component} command="gray" start='Color' end='Grey' />
            <Slider title="Contrast" component={props.component} command="contrast" min='-2' max='2' />
            <Slider title="Brightness" component={props.component} command="brightness" min='-2' max='2' />
        </ThemeProvider>

    )
}
export default Settings
