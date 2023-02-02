import { useSocketContext } from "../../../services/SocketContext";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

const RadioButton = (props) => {
    const [radioButton, setRadioButton] = useState(props.sliderValue);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    const handleChange = (event) => {
        setRadioButton(event.target.value)
        console.log(event.target.value)
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: Number(event.target.value)
        })

        if (props.led) {
            socketCtx.socket.emit('command', {
                controlId: props.led,
                color: socketCtx.fontColor,
            });
        }

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
                value={radioButton}
                onChange={handleChange}
            >
                <FormControlLabel value={80} control={<Radio />} label="None" />
                <FormControlLabel value={115} control={<Radio />} label="Beam splitter" />
                <FormControlLabel value={14} control={<Radio />} label="Pinhole" />
                <FormControlLabel value={41} control={<Radio />} label="Red LED" />
                <FormControlLabel value={45} control={<Radio />} label="White LED" />
            </RadioGroup>
        </FormControl>
    )
}
export default RadioButton;