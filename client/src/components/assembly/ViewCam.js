import { useAppContext } from "../../services/AppContext";
import { usePopUpContext } from "../../services/PopUpContext"
import { useSocketContext } from "../../services/SocketContext"
import ViewCamStream from "../Chat/ViewCamStream";
import Window from "../UI/experimentUI/Window";
import { useState, useEffect } from "react";


const Cam = (props) => {
    const [footer, setFooter] = useState(props.footer);
    const [lastChange, setLastChange] = useState(['', '', '']);
    const [alertType, setAlertType] = useState('info');
    var [alert, setAlert] = useState(false);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();
    const popupCtx = usePopUpContext();

    const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] } //stun:stun.stunprotocol.org
    var peerConnection = new RTCPeerConnection(config);

    const handleCloseWindow = () => {
        appCtx.toggleSelectedComp(props.id)
        peerConnection.close();
        socketCtx.socket.emit('watcher disconnect')
    };

    const handleReset = () => {
        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.controlId,
            reset: true
        })
    }

    const handleInfo = () => {
        var timeNow = new Date();
        let difH, difMin, difSec = 0;
        alert = '';

        timeNow = [timeNow.getHours(), timeNow.getMinutes(), timeNow.getSeconds(), timeNow.getDay(), timeNow.getMonth()]
        if (lastChange[0] === '') {
            alert = 'No last change detected!'
        } else if (timeNow[0] > lastChange[0]) {
            difH = timeNow[0] - lastChange[0];
            alert = 'Last change is more than ' + difH + ' h ago!'
        } else if (timeNow[0] === lastChange[0] && timeNow[1] === lastChange[1] && timeNow[2] > lastChange[2]) {
            difSec = timeNow[2] - lastChange[2]
            alert = 'Last change is ' + difSec + ' s ago!'
        } else if (timeNow[0] === lastChange[0] && timeNow[1] > lastChange[1]) {
            difMin = timeNow[1] - lastChange[1]
            alert = 'Last change is more than ' + difMin + ' min ago!'
        } else if (timeNow[3] > lastChange[3] || timeNow[4] > lastChange[4]) {
            alert = 'Last change is more than 24 h ago!'
        } else {
            alert = 'No last change detected!'
        }

        setAlert(alert);
        setAlertType('info');
        popupCtx.toggleShowPopUp(alert, alertType);
    }

    const handleChangeFooter = (newFooter) => {
        var time = new Date();
        setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
        setFooter(newFooter);
    };

    useEffect(() => {
        const data = (payload) => {
            console.log("Data payload", payload)
        }

        socketCtx.socket.on("data", data);

        return () => {
            socketCtx.socket.removeAllListeners('data', data)
        }

    }, [socketCtx.socket]);

    useEffect(() => {
        socketCtx.socket.emit("join stream room", { id: props.id, userId: socketCtx.username, controlId: 'Cam' });

        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Window
            header={props.title}
            top={props.top}
            left={props.left}
            height="480px"
            width="640px"
            onClose={handleCloseWindow}
            onReset={handleReset}
            onInfo={handleInfo}
        >
            <ViewCamStream
                peer={peerConnection}
                component={props.controlId}
                newStatus={handleChangeFooter}
                footer={footer}
            />
        </Window>
    )
}
export default Cam;