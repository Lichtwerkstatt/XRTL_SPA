import { useState } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const SelectCtrl = (props) => {
    const [selectValue, setSelectValue] = useState(false);
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [onlineStatus, setOnlineStatus] = useState('');
    var [mounted, setMounted] = useState(true);

    const handleSettingChanges = (event, newValue) => {
        if (mounted) {
            setSelectValue(newValue.props.value);
            socketCtx.socket.emit("command", {
                userId: socketCtx.username,
                componentId: props.component,
                command: {
                    controlId: props.command,
                    val: newValue.props.value
                }
            })

            socketCtx.socket.emit('getFooter', props.component)

            socketCtx.socket.on('getFooter', payload => {
                if (payload.componentId === props.component) {
                    setOnlineStatus(payload.online)
                    props.newStatus(String(payload.status))
                }
            })

            console.log(onlineStatus)

            socketCtx.socket.emit("footer", {
                status: "Last change by: " + socketCtx.username,
                componentId: props.component
            })

            appCtx.addLog("User set switch on " + props.component + " to " + selectValue)
        }
        return () => {
            mounted = false;
            setMounted(false);
        }
    }

    return (
        <Box sx={{ m: 2, width: 250 }}>
            <FormControl fullWidth>
                <InputLabel >Resolution</InputLabel>
                <Select
                    value={selectValue}
                    label={props.title}
                    onChange={handleSettingChanges}
                    disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true}
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