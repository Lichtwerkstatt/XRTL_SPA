import { useSocketContext } from '../../services/SocketContext';
import { usePopUpContext } from '../../services/PopUpContext';
import { useAppContext } from '../../services/AppContext';
import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import SM1ZP_bg from './media/linear_outline.png';
import Window from '../UI/experimentUI/Window';
import { useState } from 'react';

const SM1ZP = (props) => {
  const [lastChange, setLastChange] = useState(['', '', '']);
  const [alertType, setAlertType] = useState('info');
  const [footer, setFooter] = useState(props.footer);
  var [alert, setAlert] = useState(false);

  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  const handleChangeFooter = (newFooter) => {
    var time = new Date();
    setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
    setFooter(newFooter);
  };

  const handleReset = () => {
    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: props.id,
      command: 'reset'
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
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}
      background={SM1ZP_bg}
      newStatus={handleChangeFooter}
      footer={footer}
    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.controlId}
        newStatus={handleChangeFooter}
        footer={footer}
        control='linear'
        top='35'
        left='160'
      />
    </Window>
  );
};

export default SM1ZP;
