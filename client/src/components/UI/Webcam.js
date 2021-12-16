import { useState, useEffect, useRef } from "react";
//import styles from "./RotaryCtrl.module.css";
//import { MdOutlineRotateRight, MdOutlineRotateLeft } from "react-icons/md";

//import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"



const Webcam = (props) => {
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

    // const socketCtx = useSocketContext();
    // socketCtx.connect();
    return (
        <div className="webcam">
            <font color="white">
                <h1 >Hallo</h1>
            </font>
            <video ref={videoRef}></video>


        </div>
    );
};

export default Webcam;
