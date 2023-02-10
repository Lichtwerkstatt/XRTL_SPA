import { useSocketContext } from "../../../services/SocketContext";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

const RadioButton = (props) => {
    const [radioButton, setRadioButton] = useState(props.val);
    var val = false;

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    const handleChange = (event) => {
        setRadioButton(event.target.value)

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: Number(event.target.value)
        })

        if (event.target.value === '79') {
            val = true;

        } else {
            val = false;
        }
        //socketCtx.socket.on()

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component2,
            [props.option2]: val
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
                value={props.val}
                onChange={handleChange}

            >
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={80} control={<Radio />} label="None" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={112} control={<Radio />} label="Beam splitter" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={79} control={<Radio />} label="Pinhole" />
                <FormControlLabel disabled={(socketCtx.connected && props.online) ? false : true} value={40} control={<Radio />} label="LED" />
          
            </RadioGroup>
        </FormControl>
    )
}
export default RadioButton;