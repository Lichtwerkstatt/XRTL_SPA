import { useState } from "react";
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
import FormGroup from '@mui/material/FormGroup';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Settings = (props) => {
    const socketCtx = useSocketContext();
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
        }
    })

    const marks = [
        { value: -2, label: '-2', },
        { value: 0, label: '0', },
        { value: 2, label: '2', },
    ]

    const handleSettingChanges = name => (event, newValue) => {
        var command = ""
        var valueSend = ""
        if (name === "resolutionSelect") {
            setResolution(newValue.props.value);
            valueSend = newValue.props.value;
            command = "frame size"
        } else if (name === "contrastSlider") {
            setContrast(newValue);
            valueSend = newValue
            command = "contrast"
        }
        else if (name === "brightnessSlider") {
            setBrightness(newValue);
            valueSend = newValue
            command = "bightness"
        } else if (name === "greySwitch") {
            setGrey(newValue);
            valueSend = newValue
            command = "gray"
        }

        socketCtx.socket.emit("command", {
            userId: socketCtx.getNewUsername(),
            componentId: "Michelson_cam",
            command: {
                controlId: command,
                val: valueSend
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ m: 2, width: 250 }} >
                <h1>Settings</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{
                        color: 'main.primary'
                    }}>Resolution</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="resolutionSelect"
                        value={resolution}
                        label="Resolution     dc,ld,"
                        onChange={handleSettingChanges("resolutionSelect")}
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
                <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Color</Typography>
                        <Switch checked={grey}
                            onChange={handleSettingChanges("greySwitch")}
                            inputProps={{ 'aria-label': 'controlled' }} />
                        {/* <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} /> */}
                        <Typography>Grey</Typography>
                    </Stack>
                </FormGroup>
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
                        onChange={handleSettingChanges("contrastSlider")}
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
                        onChange={handleSettingChanges("brightnessSlider")}
                        marks={marks}
                    />
                </Stack>
            </Box>
        </ThemeProvider>

    )
}
export default Settings
