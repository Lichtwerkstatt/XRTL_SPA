import { useState } from "react";
import { useSocketContext } from "../../services/SocketContext";
import Slider from "./SliderCtrl";
import Switch from "./Switch"
import Select from "./Select";
import Box from '@mui/material/Box';


import { createTheme, ThemeProvider } from '@mui/material/styles';

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
            <Box sx={{ m: 2, width: 250 }} ><h1>Settings</h1> </Box>
            <Select title="Resolution" component={props.component} command="resolution" />
            <Switch component={props.component} command="gray" start='Color' end='Grey' />
            <Slider title="Contrast" component={props.component} command="contrast" min='-2' max='2' />
            <Slider title="Brightness" component={props.component} command="brightness" min='-2' max='2' />

        </ThemeProvider>

    )
}
export default Settings
