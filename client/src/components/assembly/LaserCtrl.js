import { useState } from "react";
import Window from "../UI/Window"
import SwitchOnOff from "../UI/SwitchOnOff";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"
import { usePopUpContext } from "../../services/PopUpContext"

const LaserCtrl = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const [lastChange, setLastChange] = useState(['', '', '']);
  const [alertType, setAlertType] = useState('info');
  var [alert, setAlert] = useState(false);
  var [mounted, setMounted] = useState(true);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  const handleChangeFooter = (newFooter) => {
    var time = new Date();
    setLastChange([time.getHours(), time.getMinutes(), time.getSeconds()])
    setFooter(newFooter);
  };

  const handleReset = () => {
    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      componentId: props.id,
      command: "reset"
    })
  }
  const handleInfo = () => {
    if (mounted) {
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
    return () => {
      mounted = false;
      setMounted(false);
    }
  }

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      height="200px"
      width="300px"
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}
      newStatus={handleChangeFooter}
      footer={footer}
    >
      <SwitchOnOff
        component={props.id}
        top="0"
        left="0"
        newStatus={handleChangeFooter}
        footer={footer}
      />
    </Window>
  )
}
export default LaserCtrl;