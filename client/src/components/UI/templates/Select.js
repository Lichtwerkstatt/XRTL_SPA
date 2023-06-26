import React, { useState } from "react";
import { MenuItem, Select, FormControl,  Box, InputLabel} from '@mui/material';

{/* <MenuItem value={10}>XGA (1024x768)</MenuItem>
<MenuItem value={9}>SVGA (800x600)</MenuItem>
<MenuItem value={8}>VGA (640x480)</MenuItem>
<MenuItem value={5}>QVGA (320x240)</MenuItem>
 */}
const myTypes = {
    10: 'a',
    9: 'b'
};

const TypeSelectMenuItem = (props) => {
    console.log(props)
    return (
        <MenuItem {...props}>
            {props["children"]}
        </MenuItem>
    );
};

export default function ControlledOpenSelect(props) {
    const [state, setState] = useState(myTypes[0]);
    const onChangeType = (e) => {
        console.log(e.target)
        setState(e.target.value);
    };

    return (
        <Box sx={{ m: 2, width: 250 }}>
        <FormControl fullWidth>
        <InputLabel >{props.title}</InputLabel>
                <Select label={props.title} value={state} onChange={onChangeType} sx={{ width: 150 }}>
                    {Object.keys(myTypes).map((type) => (
                        <TypeSelectMenuItem value={type}>
                            {myTypes[type]}
                        </TypeSelectMenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
