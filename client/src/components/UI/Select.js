import { useState } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import SelectItem from './SelectItem'

const SelectCtrl = (props) => {
    const [selectValue, setSelectValue] = useState('');
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

   
    return (
        <Box sx={{ m: 2, width: 250 }}>
            <FormControl fullWidth>
                <InputLabel >{props.title}</InputLabel>
                <SelectItem title={props.title} />
            </FormControl>
        </Box>
    )

}
export default SelectCtrl;