import { useState } from "react";
import { useSocketContext } from "../../services/SocketContext";
import Slider from "./SliderCtrl";
import Switch from "./Switch"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Settings = (props) => {
    const socketCtx = useSocketContext();



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


    /* 
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
        } */

    return (
        <ThemeProvider theme={theme}>
            {/*  <Box sx={{ m: 2, width: 250 }} >
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
            */}

            <Switch component={props.component} command="gray" start='Color' end='Grey' />
            <Slider title="Contrast" component={props.component} command="contrast" min='-2' max='2' />
            <Slider title="Brightness" component={props.component} command="brightness" min='-2' max='2' />

        </ThemeProvider>

    )
}
export default Settings
