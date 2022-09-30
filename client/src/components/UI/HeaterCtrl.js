import { useState, useEffect, useRef } from "react";
import { useSocketContext } from "../../services/SocketContext";
import { useAppContext } from "../../services/AppContext";
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import MicrowaveOutlinedIcon from '@mui/icons-material/MicrowaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Slider from './SliderCtrl'
import Switch1 from './Switch'
import { Switch, Autocomplete, Box, TextField, createTheme, ThemeProvider, Button, IconButton } from '@mui/material';
import styles from "./HeaterCtrl.module.css";
import { createFilterOptions } from '@mui/material/Autocomplete';

const HeaterCtrl = (props) => {
    const settingCtrl = useRef();
    var [mounted, setMounted] = useState(true);
    const [switchStatus, setSwitchStatus] = useState(false);
    // const [switchStatus2, setSwitchStatus2] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(true);
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

    const handleSettingChanges = (commando) => {
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: {
                controlId: commando,
                averageTime: average,
                updateTime: update
            }
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User set position on " + props.component + " to ")
    }

    const autoCompleteHandle = (event, newValue, option) => {
        console.log(newValue)
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
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const heaterEmit = () => {
        if (!mounted) {
            mounted = true
            setMounted(true)

            socketCtx.socket.emit("command", {
                userId: socketCtx.username,
                componentId: props.component,
                command: "getStatus"
            })

            socketCtx.socket.on("status", payload => {
                if (payload.componentId === props.component) {
                    console.log("Status of settings:   ", payload)
                }
            });

            socketCtx.socket.on('footer', payload => {
                if (payload.componentId === props.component) {
                    props.newStatus(String(payload.status))
                }
            })

            socketCtx.socket.emit('getFooter', props.component)

            socketCtx.socket.on('getFooter', payload => {
                if (payload.componentId === props.component) {
                    setOnlineStatus(payload.online)
                    props.newStatus(String(payload.status))
                }
            });
            mounted = false;
            setMounted(false);
        }
        return () => {
            mounted = false;
            setMounted(false);
        }
    }
    settingCtrl.current = heaterEmit;

    useEffect(() => {
        settingCtrl.current()
    }, [socketCtx.socket]);

    //<Switch1 component={props.component} command="switch" start='Off' end='On' online={onlineStatus} />
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.Temp}>
                <canvas text="hdhdh">

                </canvas>
                <IconButton onClick={console.log("jo")}  >
                    <SettingsOutlinedIcon sx={{ fontSize: 35 }} />
                </IconButton>

            </div>
            <div className={styles.Switch} >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <Switch1 component={props.component} command="output" start='Off' end='On' online={onlineStatus} checked={checked} />
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            </div>
            <div className={styles.Canvas2}>
                <canvas id="Heater" />
            </div>
            <div className={styles.Canvas1}>
                <canvas id="Gauge" />
            </div>
            <div className={styles.Heater} >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', mt: -2 }}>
                    <div style={{ paddingLeft: 10 }}>
                        <Button sx={{ fontSize: 17 }} startIcon={<MicrowaveOutlinedIcon />}>Heater settings </Button>
                        <Slider title="Power" component={props.component} command="output" min={0} max={255} online={onlineStatus} option='power' />
                    </div>
                    <div style={{ paddingLeft: 25 }}>
                        <Button sx={{ fontSize: 17 }} startIcon={<DeviceThermostatOutlinedIcon />}>Gauge settings </Button>
                        <Box sx={{ ml: 2 }} >

                            <Autocomplete
                                value={average}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Average time (ms)" />)}
                                onChange={autoCompleteHandle('average')}
                                onKeyPress={(e) => { if (e.key === 'Enter') { handleSettingChanges('thermister') } }}
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
                        </Box>
                    </div>
                </Box>

            </div>
        </ThemeProvider>
    )
}

export default HeaterCtrl;