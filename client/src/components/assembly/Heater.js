import { useSocketContext } from '../../services/SocketContext';
import { usePopUpContext } from '../../services/PopUpContext';
import { useAppContext } from '../../services/AppContext';
import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';
import { useState, useEffect } from 'react';


const Heater = (props) => {
    const [lastChange, setLastChange] = useState(['', '', '']);
    const [alertType, setAlertType] = useState('info');
    const [footer, setFooter] = useState(props.footer);
    var [alert, setAlert] = useState(false);

    const socketCtx = useSocketContext();
    const popupCtx = usePopUpContext();
    const appCtx = useAppContext();

    const handleCloseWindow = () => {
        appCtx.toggleSelectedComp(props.id);    
    };

    const handleReset = () => {
        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.controlIdHeater,
            reset: true
        })

        socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: props.controlIdThermistor,
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

        return () => {

        }
    }, [socketCtx.socket]);

    useEffect(() => {
        socketCtx.socket.emit('join stream room', { controlId: props.controlId, userId: socketCtx.username });

        return () => {

        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Window
            header={props.title + ' (' + props.id + ')'}
            top={props.top}
            left={props.left}
            height='340px'
            width='623px'
            onClose={handleCloseWindow}
            onReset={handleReset}
            onInfo={handleInfo}
            footer={footer}
        >
            <HeaterCtrl
                component={props.controlIdHeater}
                componentT={props.controlIdThermistor}
                newStatus={handleChangeFooter}
                led={props.LED}
                footer={footer}
            />

        </Window>
    )
}

export default Heater;