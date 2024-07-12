import { useSocketContext } from "../../../services/SocketContext";
import { Box, Stack, Typography, Slider } from "@mui/material";
import { useAppContext } from "../../../services/AppContext";
import propTypes from "prop-types";
import { useState } from "react";

/**
 * Slider component
 * 
 * @description Used to create a slider with a specified start and end point. In addition, the controlId, the status (of the component and the online status) 
 * and the command for the server must be specified. The title can but does not have to be given. To display text under the slider instead of numbers, this 
 * can be passed to the slider within the tag text in the form of an array. 
 * 
 * @param {string} component - controlId 
 * @param {string} title - title 
 * @param {number} min -  text at the left/beginning
 * @param {number} max - text at the right/end
 * @param {array} text - contains an array with numbers as keys and strings as values (for displaying text under the slider instead of numbers)
 * @param {number} sliderValue - Status of the slider from the status request 
 * @param {boolean} online - connection status to the component
 * @param {string} option - command for the server
 * 
 * @returns {React.ReactElement} styled slider with the specified props
 * 
 * @example <Slider title='Contrast' component={'cam'} online={true} sliderValue={0} min={-2} max={2} option='contrast' />
 * @example <Slider title='Exposure' component={'cam'} online={false} sliderValue={-2} min={0} max={1200} option='exposure' />
 * @example <Slider component={'cam'} online={false} sliderValue={-2} min={0} max={10} text={[{ value: 0, label: 'a' }, { value: 5, label: 'b' }, { value: 10, label: 'c' }]} option='exposure' />
 */

const SliderCtrl = (props) => {
  /**
 * @param {number} sliderPos - Indicates the status of the slider
 * @function setSliderPos - Assigning a new value
 */
  const [sliderPos, setSliderPos] = useState(props.sliderValue);

  const isMobile = window.innerWidth <= 992;

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  /**
   * Definition of the start, middle and end point
   */
  const marks = [
    { value: parseInt(props.min), label: props.min, },
    { value: 0, label: '0', },
    { value: parseInt(props.max), label: props.max, },
  ]

  /**
   * Handles the onclick event on the slider
   * 
   * @description When one clicks on the slider, the sliderValue is overwritten with the new value. This change is then sent to the server with a "command" command. 
   * Emitting footer then updates the footer of the window 
   * 
   * @param {*} event - onClick event
   * @param {number} newValue - Value with which selectValue is to be overwritten
   */
  const handleSettingChanges = (event, newValue) => {
    setSliderPos(newValue)

    socketCtx.socket.emit("command", {
      userId: socketCtx.username,
      controlId: props.component,
      [props.option]: newValue,
      color: socketCtx.fontColor,
    })

    socketCtx.socket.emit("footer", {
      status: 'Used by: ' + socketCtx.username.substring(0, 17),
      controlId: props.component
    })

    appCtx.addLog("User set position on " + props.component + " to " + sliderPos)
  }

  if (props.text) {
    return (
      <Box sx={{ width: 290, mt: 0, mr: 2, ml: 2, mb: isMobile ? 20 : 4 }}> 
        <Typography id="input-slider" gutterBottom={isMobile ? false : true}>
          {props.title}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider aria-label="Temperature"
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
      <Box sx={{ width: 290, mt: 0, mr: 2, ml: 2, mb: isMobile ? 20 : 4 }}>
        <Typography id="input-slider" gutterBottom={isMobile ? false : true}>
          {props.title}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider aria-label="Temperature"
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

SliderCtrl.propTypes = {
  component: propTypes.string.isRequired,
  title: propTypes.string,
  min: propTypes.number.isRequired,
  max: propTypes.number.isRequired,
  text: propTypes.array,
  sliderValue: propTypes.number.isRequired,
  online: propTypes.bool.isRequired,
  option: propTypes.string.isRequired
}

export default SliderCtrl;