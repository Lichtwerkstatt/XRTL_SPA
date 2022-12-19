import { useSocketContext } from "./SocketContext";
import { useState, useContext, createContext } from "react";
import { Alert, Snackbar } from '@mui/material';
import styles from "./PopUp.module.css";

const PopUpContext = createContext();

export function usePopUpContext() {
    return useContext(PopUpContext);
}

export function PopUpContextProvider({ children }) {
    const [showPopUp, setShowPopUp] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState('info')

    const socketCtx = useSocketContext();

    socketCtx.socket.on('error', error => {
        setShowPopUp(true);
        setText(error.errmsg);
        setType('error');
    })

    socketCtx.socket.on('newUserInfo', (payload) => {
        toggleShowPopUp(payload + ' has joined the experiment!', 'info')
    })

    const toggleShowPopUp = (newText, newType) => {
        setText(newText);
        setType(newType);
        setShowPopUp(!showPopUp);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopUp(false);
    };

    return (
        <PopUpContext.Provider
            value={{
                showPopUp,
                toggleShowPopUp
            }}
        >
            <Snackbar open={showPopUp} autoHideDuration={2000} onClose={handleClose} >
                <div className={styles.popUp}>
                    <Alert variant="filled" severity={type} onClose={() => { setShowPopUp(false) }}>{text}</Alert>
                </div>
            </Snackbar>
            {children}
        </PopUpContext.Provider>
    );
}


