import { Switch, Box, Typography, FormGroup, Stack } from '@mui/material';
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { useState, useEffect } from "react";

const SwiitchCtrl = (props) => {
    const [switchValue, setSwitchValue] = useState(false);
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    useEffect(() => {
        const status = (payload) => {
            if (payload.componentId === props.component) {
               // setSwitchValue(payload.status.switch.isOn);
            }
        }

        socketCtx.socket.on("status", status);

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketCtx.socket])

    const handleSettingChanges = (event, newValue) => {
        setSwitchValue(newValue);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            componentId: props.component,
            command: {
                controlId: props.command,
                [props.option]: newValue,
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
