import { useSocketContext } from "../../../services/SocketContext.js";
import { ThemeProvider } from '@mui/material/styles';
import RadioButton from '../templates/RadioButton.js';
import { theme } from '../templates/Theme.js';
import { useState, useEffect } from "react";
import Switch from '../templates/Switch.js';
import Box from '@mui/material/Box';
import propTypes from "prop-types";

/**
 * Control of the pinhole, the beam splitter, the white and red LED
 * 
 * @description This React component returns the content for the Muiltctrl window. Four controlIds are required for this, firstly to control the pinhole 
 * aperture, the beam splitter and secondly the controlId for the red and white LEDs. The LEDs can be switched on and off separately from each other. 
 * Depending on which radio button is clicked within the window, it is then moved into the beam path or, in the case of the pinhole, inserted into the beam path. 
 * 
 * @param {string} component - To control 
 * @param {string} pinhole - To control the pinhole
 * @param {string} redLED - To control the red lED
 * @param {string} whiteLED - To control the white lED
 * 
 * @returns {React.ReactElement} Multi control in form of radiobuttons
 */
const MultiCtrl = (props) => {
    const [switchWhiteIsOn, setSwitchWhiteStatus] = useState(false);
    const [switchRedIsOn, setSwitchRedStatus] = useState(false);
    const [selectionStatus, setSelectionStatus] = useState('none');
    const [onlineStatus, setOnlineStatus] = useState(false);

    const socketCtx = useSocketContext();

    let radioButtonDictionary = {
        none: 'None',
        splitter: 'Beam splitter',
        pinhole: 'Pinhole',
        rled: 'Red LED',
        wled: 'White LED'
    }

    useEffect(() => {
        const status = (payload) => {
            // To set the correct status of the individual components
            if (payload.controlId === props.redLED) {
                setSwitchRedStatus(payload.status.isOn);
            }
            else if (payload.controlId === props.whiteLED) {
                setSwitchWhiteStatus(payload.status.isOn);
            }
            else if (payload.controlId === props.component) {
                setOnlineStatus(true);
                (payload.status.busy) ? setOnlineStatus(false) : setOnlineStatus(true);
                setSelectionStatus(payload.status.state)
            }
            //console.log("Status of settings:   ", payload)
        }

        // Sending server commands to request the status of all components
        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.component,
            getStatus: true
        })

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.redLED,
            getStatus: true
        })

        socketCtx.socket.emit("command", {
            userId: socketCtx.username,
            controlId: props.whiteLED,
            getStatus: true
        })

        socketCtx.socket.on('status', status);

        socketCtx.socket.emit('getFooter', props.component)

        return () => {
            socketCtx.socket.removeAllListeners('status', status)
        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [socketCtx.socket]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mx: 1 }}>
                <RadioButton component={props.component} online={onlineStatus} dictionary={radioButtonDictionary} val={selectionStatus} option="state" />
                <Switch component={props.whiteLED} switchStatus={switchWhiteIsOn} online={onlineStatus} left='LED white Off' right='On' option='switch' />
                <Switch component={props.redLED} switchStatus={switchRedIsOn} online={onlineStatus} left='LED red Off' right='On' option='switch' />
            </Box>
        </ThemeProvider>
    )
}
MultiCtrl.propTypes = {
    component: propTypes.string.isRequired,
    pinhole: propTypes.string.isRequired,
    redLED: propTypes.string.isRequired,
    whiteLED: propTypes.string.isRequired,
}

export default MultiCtrl;
