import React, { useState } from "react";
import { MenuItem, Select, FormControl, Box, InputLabel } from '@mui/material';
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";

const TypeSelectMenuItem = (props) => {
    return (
        <MenuItem {...props}>
            {props["children"]}
        </MenuItem>
    );
};

export default function CustomSelect(props) {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [selectValue, setSelectValue] = useState(props.selectValue);

    const handleChange = (e) => {
        setSelectValue(e.target.value);

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: props.number ? Number(e.target.value) : e.target.value
        })

        socketCtx.socket.emit("footer", {
            status: 'Used by: ' + socketCtx.username.substring(0, 17),
            controlId: props.component
        })

        appCtx.addLog("User set selected " + props.component + " with " + selectValue)
    };

    return (
        <Box sx={{ m: 2, width: 250 }}>
            <FormControl fullWidth>
                <InputLabel >{props.title}</InputLabel>
                <Select
                    label={props.title}
                    value={selectValue}
                    onChange={handleChange}
                >
                    {Object.keys(props.list).map((type) => (
                        <TypeSelectMenuItem value={type}>
                            {props.list[type]}
                        </TypeSelectMenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
