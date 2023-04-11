import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { MenuItem, Select } from '@mui/material';
import { useState } from "react";

const SelectItem = (props) => {
    const [selectValue, setSelectValue] = useState('');
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const handleSettingChanges = (event, newValue) => {
        setSelectValue(newValue.props.value);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: newValue.props.value,
            color: socketCtx.fontColor,
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            controlId: props.component
        })

        appCtx.addLog("User set selected " + props.component + " with " + selectValue)
    }
    if (props.title === 'Resolution') {
        return (
            <Select
                value={selectValue}
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
    }
    else if (props.title === 'Average time (ms)') {
        return (
            <Select
                value={selectValue}
                label={props.title}
                onChange={handleSettingChanges}
                disabled={(socketCtx.connected && props.online) ? false : true}
            >
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={2000}>2000</MenuItem>

            </Select>
        )
    } else if (props.title === 'Update time (s)') {
        return (
            <Select
                value={selectValue}
                label={props.title}
                onChange={handleSettingChanges}
                disabled={(socketCtx.connected && props.online) ? false : true}
            >
                <MenuItem value={1000}>1</MenuItem>
                <MenuItem value={5000}>5</MenuItem>
                <MenuItem value={10000}>10</MenuItem>
            </Select>
        )
    } else {
        return (<div></div>)
    }
}
export default SelectItem;