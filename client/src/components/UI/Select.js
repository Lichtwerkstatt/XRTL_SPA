import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const SelectCtrl = (props) => {
    const [selectValue, setSelectValue] = useState(false);
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();
    const tempSlider = useRef();

    const sliderEmit = () => {
        socketCtx.socket.on("status", payload => {
            if (payload.component === props.component) {
                setSelectValue(payload.status[props.control]);
            }
        })
    }
    tempSlider.current = sliderEmit;

    useEffect(() => {
        tempSlider.current();
    }, [socketCtx.socket])

    const handleSettingChanges = (event, newValue) => {
        setSelectValue(newValue.props.value);
        socketCtx.socket.emit("command", {
            userId: socketCtx.getNewUsername(),
            componentId: props.component,
            command: {
                controlId: props.command,
                val: newValue.props.value
            }
        })
        appCtx.addLog("User set select on " + props.component + " to " + selectValue)
    }

    return (
        <Box sx={{ m: 2, width: 250 }} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{
                    color: 'main.primary'
                }}>Resolution</InputLabel>
                <Select
                    value={selectValue}
                    label={props.title}
                    onChange={handleSettingChanges}
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
    )
}
export default SelectCtrl;