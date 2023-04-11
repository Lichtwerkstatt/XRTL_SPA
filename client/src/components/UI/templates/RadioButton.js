import { useSocketContext } from "../../../services/SocketContext";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

const RadioButton = (props) => {
    const [radioButton, setRadioButton] = useState(props.val);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

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