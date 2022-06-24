import { useState, useEffect, useRef } from "react";
import stylesCSS from "./Settings.module.css"
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import Switch from '@mui/material/Switch';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Settings = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [resolution, setResolution] = useState('');
    const [contrast, setContrast] = useState(0);
    const [brightness, setBrightness] = useState(0);
    const [grey, setGrey] = useState(false);

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#01bd7d',
                main: '#01bd7d',
                dark: '#01bd7d',
                contrastText: '#01bd7d',
            },
            secondary: {
                light: '#01bd7d',
                main: '#01bd7d',
                dark: '#01bd7d',
                contrastText: '#01bd7d',
            },
        }
    })

    const marks = [
        { value: -2, label: '-2', },
        { value: 0, label: '0', },
        { value: 2, label: '2', },
    ]

    const handleSettingChanges = (event, newValue) => {
        var command = ""
        console.log(newValue.props.id)
        console.log(newValue)

        if (newValue.props.id == "resolutionSelect") {
            setResolution(newValue.props.value);
            command = "resolutionSelect"
        } else if (newValue.props.id == "contrastSlider") {
            setContrast(newValue.props.value);
            command = "contrast"
        }
        else if (newValue.props.id == "brightnessSlider") {
            setBrightness(newValue.props.value);
            command = "bightness"
        } else if (newValue.props.id == "brightnessSlider") {
            setGrey(newValue.props.value);
            command = "gray"
        }

        socketCtx.socket.emit("command", {
            userId: socketCtx.getNewUsername(),
            componentId: "ESP32Cam_1",
            command: {
                controlId: command,
                val: newValue.prop.value
            }
        })
    }
    handleToggle = (name) => {
        this.setState({ active: !this.state.active });
    };

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 60,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));

    return (
        <ThemeProvider theme={theme}>
            <div className={stylesCSS.settings}>
                <Box sx={{ m: 2, width: 250 }} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{
                            color: 'main.primary'
                        }}>Resolution</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="resolutionSelect"
                            value={resolution}
                            label="Resolution     dc,ld,"
                            onChange={handleSettingChanges}
                            borderColor="primary.main"
                        >
                            <MenuItem value={'UXGA'}>UXGA (1600x1200)</MenuItem>
                            <MenuItem value={'SXGA'}>SXGA (1280x1024)</MenuItem>
                            <MenuItem value={'XGA'}>XGA (1024x768)</MenuItem>
                            <MenuItem value={'SVGA'}>SVGA (800x600)</MenuItem>
                            <MenuItem value={'VGA'}>VGA (640x480)</MenuItem>
                            <MenuItem value={'QVGA'}>QVGA (320x240)</MenuItem>
                            <MenuItem value={'CIF'}>CIF (352x288)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ width: 250, m: 2 }}>
                    <Typography id="input-slider" gutterBottom>
                        Contrast
                    </Typography>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">

                        <Slider aria-label="Temperature"
                            id="contrastSlider"
                            defaultValue={0}
                            valueLabelDisplay="auto"
                            step={1}

                            min={-2}
                            max={2}
                            value={contrast}
                            onChange={handleSettingChanges}
                            marks={marks}
                        />

                    </Stack>
                    <Typography id="input-slider" gutterBottom>
                        Brightness
                    </Typography>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">

                        <Slider aria-label="Temperature"
                            id="brightnessSlider"
                            defaultValue={0}
                            valueLabelDisplay="auto"
                            step={1}
                            min={-2}
                            max={2}
                            value={brightness}
                            onChange={handleSettingChanges}
                            marks={marks}
                        />
                    </Stack>
                </Box>

                <Box sx={{ width: 250, m: 2 }}>
                    <FormGroup>
                        <Stack direction="row" spacing={1} alignItems="right">
                            <Typography>Color</Typography>
                            <Switch {...label} defaultChecked
                                checked={this.state.active}
                                onClick={() => this.handleToggle('active')}
                                value="active"
                                inputProps={{ 'aria-label': 'secondary checkbox' }} />
                            {/* <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} /> */}
                            <Typography>Grey</Typography>
                        </Stack>
                    </FormGroup>
                </Box>
            </div>
        </ThemeProvider>

    )
}
export default Settings