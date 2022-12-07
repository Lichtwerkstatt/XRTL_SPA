import { useAppContext } from "../../services/AppContext";
import { usePopUpContext } from "../../services/PopUpContext";
import { useSocketContext } from "../../services/SocketContext";
import Window from "../UI/experimentUI/Window";
import ViewCam from "../Chat/ViewCamStream";
import { useState } from "react";

const InfoWindow = (props) => {
    const [footer, setFooter] = useState("Initializing...");
    const [lastChange, setLastChange] = useState(['', '', '']);
    const [alertType, setAlertType] = useState('info');
    var [alert, setAlert] = useState(false);
    var [mounted, setMounted] = useState(false);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();
    const popupCtx = usePopUpContext();

    const handleCloseWindow = () => {
        appCtx.toggleSelectedComp(props.id)
    }

    const handleChangeFooter = (newFooter) => {
        if (!mounted) {
            mounted = true
            setMounted(true)
            var time = new Date();
            setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
            setFooter(newFooter);
        }
        return () => {
            mounted = false;
            setMounted(false);
        };
    };

    const handleReset = () => {
        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            componentId: props.id,
            command: "reset"
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

    return (
        <Window
            header="Cam_1"
            top="200"
            left="250"
            title="Cam_1"
            id="Cam_1"
            footer={footer}
            width="600px"
            onClose={handleCloseWindow}
            onReset={handleReset}
            onInfo={handleInfo}
            newStatus={handleChangeFooter}

        >
            <ViewCam
                title="Cam_1"
                id="Cam_1"
                footer={footer}
                newStatus={handleChangeFooter}
            />
        </Window>
    );
};
export default InfoWindow;
