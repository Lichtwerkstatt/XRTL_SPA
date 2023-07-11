import { Switch, Box, Typography, FormGroup, Stack } from '@mui/material';
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import propTypes from "prop-types";
import { useState } from "react";

/**
 * Switch Component
 * 
 * @description This component returns a styled switch. The left/beginning and right/end text of the switch can be set. In addition, the controlId, the status 
 * (of the component and the online status), and the command for the server must be specified.
 * 
 * @param {string} component - controlId 
 * @param {string} left -  text at the left/beginning
 * @param {string} right -text at the right/end
 * @param {boolean} switchStatus - Status of the switch from the status request 
 * @param {boolean} online - connection status to the component
 * @param {string} option - command for the server
 * 
 * @returns {React.ReactElement} styled switch with the specified props 
 * 
 * @example <Switch component={'TestSwitch'} online={true} switchStatus={false} option="switch" />
 * @example <Switch component={'TestSwitch2'} online={true} switchStatus={false} left='Off' right='On' option="switch" />
 * @example <Switch component={'TestSwitch3'} online={false} switchStatus={true} left='Front' right='Back' option="status" />
 */

const SwitchCtrl = (props) => {
    /**
     * @param {bool} switchValue - Indicates the status of the switch
     * @function setSwitchValue - Assigning a new value
     */
    const [switchValue, setSwitchValue] = useState(false);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    /**
     * Handles the onclick event on the switch
     * 
     * @description Clicking on the button overwrites it with the new value. This is then sent to the server with a "command" command. Emitting footer 
     * then updates the footer of the window 
     * 
     * @param {*} event - Clicking event
     * @param {*} newValue - Value with which switchValue is to be overwritten
     */
    const handleSettingChanges = (event, newValue) => {
        setSwitchValue(newValue);

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

        appCtx.addLog("User set switch on " + props.component + " to " + switchValue)
    }

    return (
        <Box >
            <FormGroup>
                <Stack direction="row" alignItems="center" sx={{ ml: 2 }}>
                    <Typography>{props.left}</Typography>
                    <Switch checked={props.switchStatus}
                        onChange={handleSettingChanges}
                        inputProps={{ 'aria-label': 'controlled' }}
                        disabled={(socketCtx.connected && props.online) ? false : true} />
                    <Typography>{props.right}</Typography>
                </Stack>
            </FormGroup>
        </Box>
    )
}

SwitchCtrl.propTypes = {
    component: propTypes.string.isRequired,
    left: propTypes.string,
    right: propTypes.string,
    switchStatus: propTypes.bool.isRequired,
    online: propTypes.bool.isRequired,
    option: propTypes.string.isRequired
}

export default SwitchCtrl;
