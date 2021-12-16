import { useState, useEffect, useRef, useCallback } from "react";
//import styles from "./RotaryCtrl.module.css";
//import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";
import { useSocketContext } from "../../services/SocketContext"

import { useAppContext } from "../../services/AppContext";
import Webcam from "react-webcam";

const Cam = (props) => {
    const appCtx = useAppContext();
    const socket = useSocketContext();
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    if (appCtx.showWebcam) {
        console.log(socket.connec);
        return (
            <>
                <Webcam
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
            </>
        );
    } else {
        return <></>;
    };
}
export default Cam;
