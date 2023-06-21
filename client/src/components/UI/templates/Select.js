import { Select } from '@mui/material';
import React from "react";
import { MenuItem, Typography } from '@mui/material';

const renderMenuItem = (value, e) => {
    console.log(value, e)
    return (
        <MenuItem key={e} value={value}>
            <Typography>{e}</Typography>
        </MenuItem>
    );
};

export default function App() {
    const userIds = { title: ['a', 'b', 'c'], val: [1, 2, 3] }
    const userI = ['a', 'b', 'c']
    const user = ['1', '2', '3']



    const userId = [4, 5, 6];

    const [value, setValue] = React.useState(1);
    console.log("value", value);
    return (
        <Select
            id="user"
            name="User"
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
        >
            {userId.map( (event) => { renderMenuItem(userI, user) })}
        </Select>
    );
}
