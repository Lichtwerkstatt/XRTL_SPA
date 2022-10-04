import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { Switch, Box, Typography, FormGroup, Stack } from '@mui/material';

const SwiitchCtrl = (props) => {
    const [switchValue, setSwitchValue] = useState(false);
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();
    const tempSlider = useRef();

    const sliderEmit = () => {
        socketCtx.socket.on("status", payload => {
            if (payload.component === props.component) {
                setSwitchValue(payload.status[props.control]);
            }
        })
    }
    tempSlider.current = sliderEmit;

    useEffect(() => {
        tempSlider.current();
    }, [socketCtx.socket])

    const handleSettingChanges = (event, newValue) => {
        setSwitchValue(newValue);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: {
                controlId: props.command,
                val: newValue,
            }
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User set switch on " + props.component + " to " + switchValue)

        try {
            props.icon.style.color = (switchValue === true) ? 'grey' : 'white';
        } catch (error) { }
    }

    return (
        <Box sx={{ width: 250, m: 2 }}>
            <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{props.start}</Typography>
                    <Switch checked={switchValue}
                        onChange={handleSettingChanges}
                        inputProps={{ 'aria-label': 'controlled' }}
                        disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true} />
                    <Typography>{props.end}</Typography>
                </Stack>
            </FormGroup>
        </Box>
    )
}

export default SwiitchCtrl;
