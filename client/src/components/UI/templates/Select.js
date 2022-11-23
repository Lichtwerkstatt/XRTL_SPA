
import { FormControl, InputLabel, Box } from '@mui/material';
import SelectItem from './SelectItem'


const SelectCtrl = (props) => {
    return (
        <Box sx={{ m: 2, width: 250 }}>
            <FormControl fullWidth>
                <InputLabel >{props.title}</InputLabel>
                <SelectItem title={props.title} component={props.component} online={props.online} command={props.command} option={props.option} />
            </FormControl>
        </Box>
    )
}
export default SelectCtrl;