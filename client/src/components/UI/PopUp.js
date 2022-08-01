import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { Switch, Box, Typography, FormGroup, Stack, Alert } from '@mui/material';
import styles from "./PopUp.module.css";

const PopUp = (props) => {
    const [switchValue, setSwitchValue] = useState(false);
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();
    const tempSlider = useRef();

    var type = 'info'
    var text = "jdoivjd"

    //if (props.type)
    return (
        <div className={styles.popUp}>
            <Alert variant="filled" severity={type}>{text}</Alert>
        </div>
    )

/*     else{
        return(
            <div></div>
        )
    } */


}

export default PopUp;
