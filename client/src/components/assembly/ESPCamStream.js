import Window from "../UI/experimentUI/Window";
import Settings from "../UI/CtrlUnits/Settings";
import styles from "./Stream.module.css";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { useEffect, useState } from "react";
import { usePopUpContext } from "../../services/PopUpContext"

const ESPCamStream = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const [lastChange, setLastChange] = useState(['', '', '']);
  const [alertType, setAlertType] = useState('info');
  var [alert, setAlert] = useState(false);

  const socketCtx = useSocketContext();
  const appCtx = useAppContext();
  const popupCtx = usePopUpContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.controlId);
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
      var uint8Arr = new Uint8Array(payload.data);
      var binary = "";
      for (var i = 0; i < uint8Arr.length; i++) {
        binary += String.fromCharCode(uint8Arr[i]);
      }
      var base64String = window.btoa(binary);

      var img = new Image();
      img.onload = function () {
        var canvas = document.getElementById("ScreenCanvas");
        if (canvas != null) {
          var ctx = canvas.getContext("2d");
          var x1 = 0,
            y1 = 0,
            x2 = 300,
            y2 = 200;
          ctx.drawImage(this, x1, y1, x2, y2);
        }
      };
      img.src = "data:image/jpg;base64," + base64String;
    }

    socketCtx.socket.on("data", data);

    return () => {
      socketCtx.socket.removeAllListeners('data', data)
    }
  }, [socketCtx.socket]);

  useEffect(() => {
    socketCtx.socket.emit("join stream room", { controlId: props.controlId, userId: socketCtx.username });
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="1000px"
      height="430px"
      onClose={handleCloseWindow}
      onReset={handleReset}
      onInfo={handleInfo}
      footer={footer}
      newStatus={handleChangeFooter}
    >
      <div className={styles.Canvas}>
        <canvas id="ScreenCanvas" />
      </div>
      <div className={styles.Settings}>
        <Settings
          component={props.controlId}
          led={props.LED}
          footer={footer}
          newStatus={handleChangeFooter} />
      </div>

    </Window>
  );
};
export default ESPCamStream;
