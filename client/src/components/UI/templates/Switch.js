import { Switch, Box, Typography, FormGroup, Stack } from '@mui/material';
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

const SwiitchCtrl = (props) => {
    const [switchValue, setSwitchValue] = useState(false);
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    try {
        props.icon.style.color = (props.switchStatus !== true) ? 'grey' : 'white';
    } catch (error) { }

    const handleSettingChanges = (event, newValue) => {
        setSwitchValue(newValue);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: newValue,

        })

        socketCtx.socket.emit('LED', {
            LED: props.led,
            color: socketCtx.fontColor,
        });

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            controlId: props.component
        })

        appCtx.addLog("User set switch on " + props.component + " to " + switchValue)

        try {
            props.icon.style.color = (props.switchStatus !== true) ? 'grey' : 'white';
        } catch (error) { }
    }

    return (
        <Box sx={{ width: 250, m: 2 }}>
            <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{props.start}</Typography>
                    <Switch checked={props.switchStatus}
                        onChange={handleSettingChanges}
                        inputProps={{ 'aria-label': 'controlled' }}
                        disabled={(socketCtx.connected && props.online) ? false : true} />
                    <Typography>{props.end}</Typography>
                </Stack>
            </FormGroup>
        </Box>
    )
}

export default SwiitchCtrl;
