import { useState } from "react";
import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";
import KM100_Background from "./media/km100_outline.png"
import { useAppContext } from "../../services/AppContext";
import { usePopUpContext } from "../UI/PopUpContext";
import { useSocketContext } from "../../services/SocketContext"

const KM100 = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const [lastChange, setLastChange] = useState([0, 0]);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();

  console.log(popupCtx)

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }
  const handleReset = () => {
    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      componentId: props.id,
      command: "reset"
    })
  }
  const handleInfo = () => {
    var timeNow = new Date();
    let difH = 0;
    let difMin = 0;
    let difSec = 0;
    var a = '';

    timeNow = [timeNow.getHours(), timeNow.getMinutes(), timeNow.getSeconds()]

    if (timeNow[0] > lastChange[0]) {
      difH = timeNow[0] - lastChange[0];
      a = 'Last change is more than ' + difH + ' h ago!'
      console.log(difH)
    } else if (timeNow[0] > lastChange[0] && timeNow[1] === lastChange[1] && timeNow[2] > lastChange[2]) {
      difSec = timeNow[2] - lastChange[2]
      a = 'Last change is ' + difSec + ' s ago!'
      console.log(difSec)
    } else if (timeNow[0] === lastChange[0] && timeNow[1] > lastChange[1]) {
      difMin = timeNow[1] - lastChange[1]
      a = 'Last change is more than ' + difMin + ' min ago!'
      console.log(difMin)
    } else if (timeNow[0] < lastChange[0] || timeNow[1] < lastChange[1] ) {
      a = 'Last change is more than 24 h ago!'
    } else {
      a = 'No last change detected!'
      console.log("No last change")

    }
    setAlert(a)
    console.log(timeNow)
    console.log(lastChange)

    console.log(popupCtx)

    popupCtx.toggleShowPopUp(a, alertType);

  }

  const handleChangeFooter = (newFooter) => {
    var time = new Date();
    setLastChange([time.getHours(), time.getMinutes(), time.getSeconds()])
    setFooter(newFooter);
  };

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      footer={footer}
      top={props.top}
      left={props.left}
      height="240px"
      width="250px"
      background={KM100_Background}
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.id}
        control="top"
        newStatus={handleChangeFooter}
        footer={footer}
        top="20"
        left="160"
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.id}
        control="bottom"
        newStatus={handleChangeFooter}
        footer={footer}
        top="50"
        left="160"
      />
    </Window>
  );
};

export default KM100;
