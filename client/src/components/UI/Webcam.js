import { useState, useEffect, useRef } from "react";
//import styles from "./RotaryCtrl.module.css";
//import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";
import { useSocketContext } from "../../services/SocketContext"

import { useAppContext } from "../../services/AppContext";


const Webcam = (props) => {
    const appCtx = useAppContext();
    const socket = useSocketContext();

    const videoRef = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1020,
                height: 720
            }
        }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])


    return (
        <div className="webcam">
            <video ref={videoRef}></video>


        </div>
    );
};
export default Webcam;
