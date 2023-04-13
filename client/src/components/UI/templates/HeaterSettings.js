import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import { Button } from '@mui/material';
import styles from '../CSS/HeaterCtrl.module.css';
import Select from './Select'

const HeaterSettings = (props) => {

    return (
        <div className={styles.Temp}>
            <div className={styles.Canvas2}>
                <Button sx={{ fontSize: 17, marginLeft: -34, marginTop: -4, marginBottom: 10 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                <div className={styles.Select}>
                    <Select sx={{ zIndex: 1500, marginBottom: -10 }} title='Average time (ms)' component={props.component} online={props.online} option='averageTime' selectValue={props.averageTime} />
                    <Select title='Update time (s)' component={props.component} online={props.online} option='updateTime' selectValue={props.updateTime} />
                </div>
            </div>
        </div>
    )

}
export default HeaterSettings;