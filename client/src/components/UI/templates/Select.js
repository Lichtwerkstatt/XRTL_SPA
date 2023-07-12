import { MenuItem, Select, FormControl, Box, InputLabel } from '@mui/material';
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import propTypes from "prop-types";
import { useState } from "react";

/**
 * Gets the objects that have the assigned properties. A MenuItem is then created for each object with the corresponding text and value.
 * 
 * @param {*} props - Select items to be created 
 * @returns {React.ReactElement}  <MenuItem value={value}> text <MenuItem/> 
 */
const TypeSelectMenuItem = (props) => {
    return (
        <MenuItem {...props}>
            {props["children"]}
        </MenuItem>
    );
};

/**
 * Select component
 * 
 * @description Select is used to choose from a list of options. For this, the controlId, the status (of the component and the online status), 
 * the list of options and the command for the server must be specified. The title can, but does not have to be specified. 
 * 
 * @param {string} component - controlId 
 * @param {string} title -  title
 * @param {string} list - Dictionary with the keys and corresponding values as content for the select.
 * @param {boolean} switchStatus - Status of the select from the status query 
 * @param {boolean} online - connection status to the component
 * @param {string} option - command for the server
 * 
 * @returns {React.ReactElement} styled select with the specified props
 * 
 * @example <Select title='Resolution' component={'Select'} online={true} option='frameSize' selectValue={1} list={{1: 'a', 2: 'b', 3: 'c'}} />
 * @example <Select title='Resolution' component={'Select2'} online={true} option='frameSize' selectValue={'a'} list={{a: 1, b: 2, c: 4} />
 * @example <Select component={'Select3'} online={true} option='frameSize' selectValue={3} list={{1: 'a', b: 2, 3: 'c'}} />
 */
export default function CustomSelect(props) {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    /**
     * @param {string|number} selectValue - Indicates the status of the select
     * @function setSelectValue - Assigning a new value
     */
    const [selectValue, setSelectValue] = useState(props.selectValue);

    /**
     * Handles the onclick event on a select option 
     * 
     * @description When a select element is clicked, SelectValue is overwritten with the new value. This change is then sent to the server with a "command" command. 
     * Emitting footer then updates the footer of the window. 
     * 
     * @param {*} event - clicking event (contains the new value)
     */
    const handleChange = (event) => {
        setSelectValue(event.target.value);

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: isNaN(event.target.value) ? event.target.value : Number(event.target.value)
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
                    disabled={(socketCtx.connected && props.online) ? false : true} >
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

CustomSelect.propTypes = {
    component: propTypes.string.isRequired,
    title: propTypes.string,
    list: propTypes.array.isRequired,
    selectValue: propTypes.oneOf([propTypes.string, propTypes.number]).isRequired,
    online: propTypes.bool.isRequired,
    option: propTypes.string.isRequired
}