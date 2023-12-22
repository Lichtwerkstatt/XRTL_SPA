import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import propTypes from "prop-types";
import { useState } from "react";

/**
 * Radio button component
 * 
 * @description Radio buttons are used to make a specific selection from several options. This requires a dictionary with the text to be specified as the value and the key to be sent to the server. 
 * Furthermore, of course, the controlId, the server command.
 * 
 * @param {string} component - general controlId of the component
 * @param {number} val -  value of the set radio button 
 * @param {dictionary} dictionary - Dictionary with the keys and corresponding values as content for the radio button/s
 * @param {boolean} online - connection status to the component
 * @param {string} option - command for the server
 * 
 * @returns {React.ReactElement} styled radiobutton with the specified props
 * 
 * @example <RadioButton component={'RadioButton'} online={true} dictionary={{1: 'a', 2: 'b', 3: 'c'}} val={1} option="state" />
 * @example <RadioButton component={'RadioButton2'} online={true} dictionary={{a: 1, b: 2, c: 3} val={2} option="state" />
 * @example <RadioButton component={'RadioButton3'} online={false} dictionary={{a: '1', 2: 2, 3: 'c'}} val={1} option="state" />
 * 
 */
const RadioButton = (props) => {
    const [radioButton, setRadioButton] = useState(props.val);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    // Handles the clicking on a radio button and the associated sending of a server command as well as the changing of the selected radio button
    const handleChange = async (event) => {
        setRadioButton(event.target.value)

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: event.target.value,
            color: socketCtx.fontColor,
        })

        socketCtx.socket.emit("footer", {
            status: "Last change by: " + socketCtx.username,
            controlId: props.component
        })

        appCtx.addLog("User set position on " + props.component + " to " + radioButton)
    }

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{props.title}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={props.val}
                onChange={handleChange}
            >
                {Object.keys(props.dictionary).map(val =>
                    <FormControlLabel
                        disabled={(socketCtx.connected && props.online) ? false : true}
                        label={props.dictionary[val]}
                        value={val}
                        control={<Radio />}
                    />
                )}
            </RadioGroup>
        </FormControl>
    )
}

RadioButton.propTypes = {
    component: propTypes.string.isRequired,
    dictionary: propTypes.array.isRequired,
    online: propTypes.bool.isRequired,
    option: propTypes.string.isRequired,
    val: propTypes.oneOf([propTypes.string, propTypes.number]).isRequired
}

export default RadioButton;