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
            componentId: props.component,
            command: {
                controlId: props.command,
                [props.option]: newValue.props.value
            }
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            componentId: props.component
        })

        appCtx.addLog("User set switch on " + props.component + " to " + selectValue)
    }

    if (props.title === 'Average time (ms)') {
        return (
            <Select
                value={selectValue}
                label={props.title}
                onChange={handleSettingChanges}
                disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true}
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
                disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true}
            >
                <MenuItem value={1000}>100</MenuItem>
                <MenuItem value={5000}>500</MenuItem>
                <MenuItem value={10000}>1000</MenuItem>
            </Select>
        )
    } else {
        return (<div></div>)
    }
}
export default SelectItem;