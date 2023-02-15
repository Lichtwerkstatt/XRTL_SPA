import { useSocketContext } from "../../../services/SocketContext";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

const RadioButton = (props) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [radioButton, setRadioButton] = useState(props.val);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    const handleChangePin = async (event) => {
        setRadioButton(event.target.value)

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: Number(event.target.value)
        })

        await delay(5000);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component2,
            [props.option2]: true
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


    const handleChange = async (event) => {
        setRadioButton(event.target.value)

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            [props.option]: Number(event.target.value)
        })

        await delay(5000);
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component2,
            [props.option2]: false
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
            >
                <FormControlLabel onChange={handleChange} disabled={(socketCtx.connected && props.online) ? false : true} value={80} control={<Radio />} label="None" />
                <FormControlLabel onChange={handleChange} disabled={(socketCtx.connected && props.online) ? false : true} value={112} control={<Radio />} label="Beam splitter" />
                <FormControlLabel onChange={handleChangePin} disabled={(socketCtx.connected && props.online) ? false : true} value={79} control={<Radio />} label="Pinhole" />
                <FormControlLabel onChange={handleChange} disabled={(socketCtx.connected && props.online) ? false : true} value={40} control={<Radio />} label="LED" />

            </RadioGroup>
        </FormControl>
    )
}
export default RadioButton;