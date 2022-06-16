import { useState, useEffect, useRef } from "react";
import styles from "./Settings.module.css"
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import Select from 'react-select';

const Settings = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const options = [
        { value: 'UXGA', label: 'UXGA (1600x1200)' },
        { value: 'SXGA', label: 'SXGA (1280x1024)' },
        { value: 'XGA', label: 'XGA (1024x768)' },
        { value: 'SVGA', label: 'SVGA (800x600)' },
        { value: 'VGA', label: 'VGA (640x480)' },
        { value: 'QVGA', label: 'QVGA (320x240)' },
        { value: 'CIF', label: 'CIF (352x288)' }
    ]

    return (

        <Select className={styles.Settings} options={options}
            defaultValue={options[2]} />


    )
}
export default Settings