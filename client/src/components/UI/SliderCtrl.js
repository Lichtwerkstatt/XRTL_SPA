import { useSocketContext } from "../../services/SocketContext";
import { Box, Stack, Typography, Slider } from "@mui/material";
import { useAppContext } from "../../services/AppContext";
import { useState, useEffect, useRef } from "react";

const SliderCtrl = (props) => {
  const [sliderPos, setSliderPos] = useState(props.sliderPos);
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempSlider = useRef();

  const marks = [
    { value: parseInt(props.min), label: props.min, },
    { value: 0, label: '0', },
    { value: parseInt(props.max), label: props.max, },
  ]

  const sliderEmit = () => {
    socketCtx.socket.on("status", payload => {
      if (payload.component === props.component) {
        setSliderPos(payload.status[props.control]);
      }
    })
  }
  tempSlider.current = sliderEmit;

  useEffect(() => {
    tempSlider.current();
  }, [socketCtx.socket])

  const handleSettingChanges = (event, newValue) => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      componentId: props.component,
      command: {
        controlId: props.command,
        [props.option]: newValue
      }
    })

    socketCtx.socket.emit("footer", {
      status: "Last change by: " + socketCtx.username,
      componentId: props.component
    })

    appCtx.addLog("User set position on " + props.component + " to " + sliderPos)
  }

  return (
    <Box sx={{ width: 250, m: 2 }}>
      <Typography id="input-slider" gutterBottom>
        {props.title}
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="Temperature"
          id="brightnessSlider"
          defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          min={props.min}
          max={props.max}
          value={sliderPos}
          onChangeCommitted={handleSettingChanges}
          marks={marks}
          disabled={(socketCtx.connected && !appCtx.busyComps.has(props.component) && props.online) ? false : true}
        />
      </Stack>
    </Box>
  )
}

export default SliderCtrl;