import { useState, useContext, createContext } from "react";
import { useSocketContext } from "./SocketContext";
import { Alert, Snackbar } from '@mui/material';
import {useTranslation} from "react-i18next";

const PopUpContext = createContext();

// Creates the PopUpContext, so that it can be accessed/imported from other React components
export function usePopUpContext() {
    return useContext(PopUpContext);
}
/**
 * PopUp Window 
 *
 * @description  This React component is a ContextProvider, which means that every function within this class can be executed whenever 
 * this class is imported. It can only be imported in React components, which are in the hierachie below the PopUpcontext. This class 
 * included a function for the cration of a new PopUp window with the transmitted text and typ. The type can be for example warning, success
 * or info.
 * 
 *
 * @returns {React.Context} PopUp context
 */
export function PopUpContextProvider({ children }) {
    const [showPopUp, setShowPopUp] = useState(false); // displays popUp window, if true
    const [text, setText] = useState(''); // represents the text displayed in the popUp window
    const [type, setType] = useState('info'); // sets the type of the popUp window, e.g. warning, info, success

    const socketCtx = useSocketContext();
    const { t, i18n } = useTranslation();

    // Display of popUp window, if microcontroller sends a error message to the server
    socketCtx.socket.on('error', error => {
        setShowPopUp(true);
        setText(error.errmsg);
        setType('error');
    })

    // Display of popUp widnow, if new web application client has connected to the server
    socketCtx.socket.on('newUserInfo', (payload) => {
        toggleShowPopUp(t('new_user', {payload}), 'info')
    })

    // Creates a new popUp Window with transmitted text and type
    const toggleShowPopUp = (newText, newType) => {
        setText(newText);
        setType(newType);
        setShowPopUp(!showPopUp);
    }

    // Handles the closing of the popUp window, if the the close icon is clicked
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopUp(false);
    };

    //Styling of the popUp window 
    return (
        <PopUpContext.Provider
            value={{
                showPopUp,
                toggleShowPopUp
            }}
        >
            <Snackbar open={showPopUp} autoHideDuration={2000} onClose={handleClose} >
                <div  style={{ position: 'fixed', top: '5.25%', right: '0.5%' }}>
                    <Alert variant="filled" severity={type} onClose={() => { setShowPopUp(false) }}>{text}</Alert>
                </div>
            </Snackbar>
            {children}
        </PopUpContext.Provider>
    );
} 