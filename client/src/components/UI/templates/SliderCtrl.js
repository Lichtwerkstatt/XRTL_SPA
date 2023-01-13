import { useSocketContext } from "../../../services/SocketContext";
import { Box, Stack, Typography, Slider } from "@mui/material";
import { useAppContext } from "../../../services/AppContext";
import { useState } from "react";

const SliderCtrl = (props) => {
  const [sliderPos, setSliderPos] = useState(props.sliderValue);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  const marks = [
    { value: parseInt(props.min), label: props.min, },
    { value: 0, label: '0', },
    { value: parseInt(props.max), label: props.max, },
  ]

  const handleSettingChanges = (event, newValue) => {
    setSliderPos(newValue)
    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      color: socketCtx.fontColor,
      controlId: props.component,
      [props.option]: newValue
    })

    socketCtx.socket.emit("footer", {
      status: "Last change by: " + socketCtx.username,
      controlId: props.component
    })

    appCtx.addLog("User set position on " + props.component + " to " + sliderPos)
  }

  if (props.text) {
    return (
      <Box sx={{ width: 250, m: 2 }}>
        <Typography id="input-slider" gutterBottom>
          {props.title}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider aria-label="Temperature"
            id="brightnessSlider"

            valueLabelDisplay="auto"
            step={1}
            min={props.min}
            max={props.max}
            value={props.sliderValue}
            onChangeCommitted={handleSettingChanges}
            marks={props.text}
            disabled={(socketCtx.connected && props.online) ? false : true}
          />
        </Stack>
      </Box>
    )
  } else {
    return (
      <Box sx={{ width: 250, m: 2 }}>
        <Typography id="input-slider" gutterBottom>
          {props.title}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider aria-label="Temperature"
            id="brightnessSlider"

            valueLabelDisplay="auto"
            step={1}
            min={props.min}
            max={props.max}
            value={props.sliderValue}
            onChangeCommitted={handleSettingChanges}
            marks={marks}
            disabled={(socketCtx.connected && props.online) ? false : true}
          />
        </Stack>
      </Box>
    )
  }
}
export default SliderCtrl;