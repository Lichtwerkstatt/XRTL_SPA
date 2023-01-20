import BeamSplitterCtrl from "../UI/CtrlUnits/BeamSplitterCtrl2";
import { useSocketContext } from "../../services/SocketContext";
import { usePopUpContext } from "../../services/PopUpContext";
import { useAppContext } from "../../services/AppContext";
import Window from "../UI/experimentUI/Window";
import { useState } from "react";

const BeamSplitter = (props) => {
  const [lastChange, setLastChange] = useState(['', '', '']);
  const [footer, setFooter] = useState(props.footer);
  const [alertType, setAlertType] = useState('info');
  var [alert, setAlert] = useState(false);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

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
    setFooter(newFooter);
    setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
  };

  return (
    <Window
      header={props.title}
      footer={footer}
      top={props.top}
      left={props.left}
      height="140px"
      width="320px"
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}

    >
      <BeamSplitterCtrl
        rotation={props.rotationTop}
        component={props.controlId}
        newStatus={handleChangeFooter}
        led={props.LED}
        footer={footer}
        top="20"
        left="160"
      />
    </Window>
  );
};

export default BeamSplitter;
