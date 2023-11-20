import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import styles from '../CSS/HeaterCtrl.module.css';
import { Button } from '@mui/material';
import propTypes from "prop-types";
import Select from './Select';

/**
 * Heater settings
 * 
 * @description This Recat component returns the setting options of the thermistor. To do this, the selection options for the drop-down menus 
 * must be transferred in the form of lists.
 * 
 * @param {string} component - controlId of the thermistor
 * @param {number} updateTime -  Set update time
 * @param {number} averageTime - Set average time
 * 
 * @returns {React.ReactElement} styled thermistor settings with the specified props
 */
const HeaterSettings = (props) => {
    // List contains all possible selection options for the drop-down menu for setting the average time 
    const averageTimeList = {
        100: 100,
        500: 500,
        1000: 1000,
        2000: 2000
    }

    // List contains all possible selection options for the drop-down menu for setting the update time 
    const updateTimeList = {
        1000: 1,
        5000: 5,
        10000: 10
    }

    return (
        <div className={styles.Temp}>
            <div className={styles.Canvas2}>
                <Button sx={{ fontSize: 17, marginLeft: -34, marginTop: -4, marginBottom: 10 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                <div className={styles.Select}>
                    <Select sx={{ zIndex: 1500, marginBottom: -10 }} title='Average time (ms)' component={props.component} online={props.online} option='averageTime' selectValue={props.averageTime} list={averageTimeList} />
                    <Select title='Update time (s)' component={props.component} online={props.online} option='updateTime' selectValue={props.updateTime} list={updateTimeList} />
                </div>
            </div>
        </div>
    )
}

HeaterSettings.propTypes = {
    component: propTypes.string.isRequired,
    updateTime: propTypes.number.isRequired,
    averageTime: propTypes.number.isRequired,
    online: propTypes.bool.isRequired
}
export default HeaterSettings;