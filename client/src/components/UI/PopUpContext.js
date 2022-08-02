import { useState, useEffect, useRef, useContext, createContext } from "react";
import { useSocketContext } from "../../services/SocketContext";
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

    //const socketCtx = useSocketContext();
    //const tempSlider = useRef();

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


