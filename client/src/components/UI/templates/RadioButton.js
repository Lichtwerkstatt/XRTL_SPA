import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

/**
 * Radiobutton component
 * 
 * @description Select is used to choose from a list of options. For this, the controlId, the status (of the component and the online status), 
 * the list of options and the command for the server must be specified. The title can, but does not have to be specified. 
 * 
 * @param {string} component - general controlId of the component
 * @param {string} component - controlId of the pinhole
 * @param {number} val -  value of the set radio button 
 * @param {boolean} online - connection status to the component
 * @param {string} option - command for the server
 * 
 * @returns {React.ReactElement} styled radiobutton with the specified props
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
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={'none'} control={<Radio />} label="None" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={'splitter'} control={<Radio />} label="Beam splitter" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={'pinhole'} control={<Radio />} label="Pinhole" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={'rled'} control={<Radio />} label="Red LED" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={'wled'} control={<Radio />} label="White LED" />

            </RadioGroup>
        </FormControl>
    )
}
export default RadioButton;