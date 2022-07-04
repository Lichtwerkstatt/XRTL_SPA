import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import Slider from '@mui/material/Slider';


const SliderCtrl = (props) => {
  const [sliderPos, setSliderPos] = useState(props.sliderPos);
  const [brightness, setBrightness] = useState(0);
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempSlider = useRef();

  const marks = [
    { value: -2, label: '-2', },
    { value: 0, label: '0', },
    { value: 2, label: '2', },
]

  const sliderEmit = () => {
    socketCtx.socket.on("status", payload => {
      console.log(payload);
      if (payload.component === props.component) {
        setSliderPos(payload.status[props.control]);
      }
    })
  }
  tempSlider.current = sliderEmit;

  useEffect(() => {
    tempSlider.current();
  }, [socketCtx.socket])

  const handleSettingChanges = () => (event, newValue) => {
    socketCtx.socket.emit("command", {
      userId: socketCtx.getNewUsername(),
      componentId: "Michelson_cam",
      command: {
        controlId: "bightness",
        val: newValue
      }
    })
    appCtx.addLog("User set position on " + props.component + " to " + sliderPos)
  }

  return (
    <Slider aria-label="Temperature"
      id="brightnessSlider"
      defaultValue={0}
      valueLabelDisplay="auto"
      step={1}
      min={-2}
      max={2}
      value={brightness}
      onChange={handleSettingChanges}
      marks={marks}
    />
  )
}

export default SliderCtrl;