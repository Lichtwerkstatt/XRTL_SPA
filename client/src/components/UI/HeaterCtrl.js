import { useState } from "react";
import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import SpeedIcon from '@mui/icons-material/Speed';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Slider from './SliderCtrl'
import Select from './Select'
import Switch from './Switch'
import { Grid, Autocomplete, Box, TextField, createTheme, ThemeProvider, Button, IconButton } from '@mui/material';
import styles from "./HeaterCtrl.module.css";
import { createFilterOptions } from '@mui/material/Autocomplete';

const HeaterCtrl = (props) => {
    const [switchStatus, setSwitchStatus] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [average, setAverage] = useState(null);
    const [update, setUpdate] = useState(null);
    const filter = createFilterOptions();
    const AverageTimeOption = [{ title: 100 }, { title: 500 }, { title: 1000 }, { title: 2000 }]
    const UpdateTimeOption = [{ title: 1000 }, { title: 5000 }, { title: 10000 }]

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

    const handleCtrl = (direction, negativ) => (event) => {
        event.preventDefault();
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: {
                controlId: direction,
                val: negativ ? 15 : -15
            }
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User changed the position on " + props.component)
    }


    const autoCompleteHandle = (event, newValue, option) => {
        if (option === 'average') {
            if (typeof newValue === 'string') {
                setAverage({ title: newValue, });
            } else if (newValue && newValue.inputValue) {
                setAverage({ title: newValue.inputValue, });
            } else {
                setAverage(newValue);
            }
        } else if (option === 'update') {
            if (typeof newValue === 'string') {
                setUpdate({ title: newValue, });
            } else if (newValue && newValue.inputValue) {
                setUpdate({ title: newValue.inputValue, });
            } else {
                setUpdate(newValue);
            }
        }
    }

    const filterOption = (options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
            filtered.push({ inputValue, title: `Add "${inputValue}"`, });
        }
        return filtered;
    }

    const getLabel = (option) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.title;
    }

    /*     <Select title="Average time (ms)" component={props.component} online={onlineStatus} command="frame size" />
        <Select title="Update time (s)" component={props.component} online={onlineStatus} command="frame size" /> */

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.Temp}>
                <canvas text="hdhdh">

                </canvas>
                <IconButton onClick={handleCtrl("virtualPan", false)}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>

            </div>
            <div className={styles.Switch} >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <Switch component={props.component} command="output" option="stream" start='Off' end='On' checked={switchStatus} online={onlineStatus} />
                    <Switch component={props.component} command="switch" option="val" start='Off' end='On' checked={switchStatus} online={onlineStatus} />
                </Box>
            </div>
            <div className={styles.Heater} >

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                    <div style={{ paddingLeft: 10 }}>
                        <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                        <Slider title="Power" component={props.component} command="brightness" min='0' max='255' online={onlineStatus} />
                    </div>
                    <div style={{ paddingLeft: 15 }}>
                        <Button sx={{ fontSize: 17 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                        <Autocomplete
                            value={average}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Average time (ms)" />)}
                            onChange={autoCompleteHandle('average')}
                            onKeyPress={(e) => { if (e.key === 'Enter') { console.log('') } }}
                            filterOptions={filterOption}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={AverageTimeOption}
                            getOptionLabel={getLabel}
                            renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        />
                        <Autocomplete
                            value={update}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Update time (s) " />)}
                            onChange={autoCompleteHandle('update')}
                            onKeyPress={(e) => { if (e.key === 'Enter') { console.log('') } }}
                            filterOptions={filterOption}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={UpdateTimeOption}
                            getOptionLabel={getLabel}
                            renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        />
                    </div>
                </Box>
                <div className={styles.Canvas2}>
                    <canvas id="Heater" />
                </div>
                <div className={styles.Canvas1}>
                    <canvas id="Gauge" />
                </div>

            </div>
        </ThemeProvider>
    )
}

export default HeaterCtrl;