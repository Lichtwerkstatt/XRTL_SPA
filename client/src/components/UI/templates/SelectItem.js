import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { MenuItem, Select } from '@mui/material';
import { useState } from "react";

const SelectItem = (props) => {
    const [selectValue, setSelectValue] = useState(props.selectValue);
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const handleSettingChanges = (event, newValue) => {
        setSelectValue(newValue.props.value);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: newValue.props.value
        })

        socketCtx.socket.emit("footer", {
            status: 'Used by: ' + socketCtx.username.substring(0, 17),
            controlId: props.component
        })

        appCtx.addLog("User set selected " + props.component + " with " + selectValue)
    }
    if (props.title === 'Resolution') {
        return (
            <Select
                value={props.selectValue}
                label={props.title}
                onChange={handleSettingChanges}
                disabled={(socketCtx.connected && props.online) ? false : true}
            >
                <MenuItem value={10}>XGA (1024x768)</MenuItem>
                <MenuItem value={9}>SVGA (800x600)</MenuItem>
                <MenuItem value={8}>VGA (640x480)</MenuItem>
                <MenuItem value={5}>QVGA (320x240)</MenuItem>
            </Select>
        )
    } else {
        return (<div></div>)
    }
}
export default SelectItem;