import { useSocketContext } from '../../services/SocketContext'
import { usePopUpContext } from '../../services/PopUpContext'
import { useAppContext } from '../../services/AppContext';
import KM100_Background from './media/km100_outline.png'
import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Window from '../UI/experimentUI/Window';
import { useState } from 'react';

const KM100 = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const [lastChange, setLastChange] = useState(['', '', '']);
  const [alertType, setAlertType] = useState('info');
  var [alert, setAlert] = useState(false);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  //wie handhaben wir das?
  const handleReset = () => {

    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: props.controlIdBottom,
      reset: true
    })

    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: props.controlIdTop,
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

  return (
    <Window
      header={props.title}
      footer={footer}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      background={KM100_Background}
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.controlIdTop}
        newStatus={handleChangeFooter}
        led={props.LED}
        footer={footer}
        top='20'
        left='160'
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.controlIdBottom}
        newStatus={handleChangeFooter}
        led={props.LED}
        footer={footer}
        top='50'
        left='160'
      />
    </Window>
  );
};
export default KM100;