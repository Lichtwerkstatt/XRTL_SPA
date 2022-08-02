import { useState, useEffect, useRef, useContext, createContext } from "react";

import { useSocketContext } from "../../services/SocketContext";
import { Switch, Box, Typography, FormGroup, Stack, Alert } from '@mui/material';
import styles from "./PopUp.module.css";
/*
const PopUpContext = createContext();

export function usePopUpContext() {
    return useContext(PopUpContext);
}

export function PopUpProvider({ children }) {
    const [switchValue, setSwitchValue] = useState(false);
    const [showPopUp, setShowPopUp] = useState(true)
    const appCtx = usePopUpContext();
    const socketCtx = useSocketContext();
    const tempSlider = useRef();

    var type = 'info'
    var text = "jdoivjd"

         if (showPopUp)
            return (
                <div className={styles.popUp}>
                    <Alert variant="filled" severity={type} onClose={() => { setShowPopUp(false) }}>{text}</Alert>
                </div>
            )
    
        else {
            return (
                <div></div>
            )
        } 

    const toggleShowPopUp = () => {
        setShowPopUp(!showPopUp)
    }

    return (
        <PopUpContext.Provider value={{ showPopUp, setShowPopUp, toggleShowPopUp }}>
                        <div className={styles.popUp}>
                <Alert variant="filled" severity={type} onClose={() => { setShowPopUp(false) }}>{text}</Alert>
            </div> 
            {children}

        </PopUpContext.Provider>
    )
} */


const PopUpContext = createContext();

export function usePopUpContext() {
    return useContext(PopUpContext);
}

export function PopUpContextProvider({ children }) {
    const [showPopUp, setShowPopUp] = useState(true)

    const socketCtx = useSocketContext();
    const tempSlider = useRef();

    var type = 'info'
    var text = "jdoivjd"
    const toggleShowPopUp = () => {
        setShowPopUp(true)
    }

    const alert = () => {
        return (
            <div className={styles.popUp}>
                <Alert variant="filled" severity={type} onClose={() => { setShowPopUp(false) }}>{text}</Alert>
            </div>
        )
    }

    return (
        <PopUpContext.Provider
            value={{
                showPopUp,
                toggleShowPopUp,
                alert
            }}
        >

            {children}
        </PopUpContext.Provider>
    );
}


