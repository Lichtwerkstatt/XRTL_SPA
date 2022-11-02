import Window from "../UI/Window";
import Settings from "../UI/Settings";
import styles from "./Stream.module.css";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { useEffect, useRef, useState } from "react";
import { usePopUpContext } from "../../services/PopUpContext"

const Stream = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const [lastChange, setLastChange] = useState(['', '', '']);
  const [alertType, setAlertType] = useState('info');
  var [alert, setAlert] = useState(false);
  var [mounted, setMounted] = useState(false);

  const socketCtx = useSocketContext();
  const appCtx = useAppContext();
  const popupCtx = usePopUpContext();

  const tempWebcam = useRef();
  const tempWebcam2 = useRef();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id);
    socketCtx.socket.emit("leave stream room", { id: props.id, userId: socketCtx.username });
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
    }
  };

  const webcamEmitPic = () => {
    socketCtx.socket.on("data", function (payload) {
      var uint8Arr = new Uint8Array(payload.data.data);
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
    });
  }

  const webcamStartStreaming = () => {
    socketCtx.socket.emit("join stream room", { id: props.id, userId: socketCtx.username });
  }

  tempWebcam.current = webcamEmitPic;
  tempWebcam2.current = webcamStartStreaming;

  useEffect(() => {
    tempWebcam.current();
  }, [socketCtx.socket]);

  useEffect(() => {
    tempWebcam2.current();
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
        <Settings component={props.id} footer={footer} newStatus={handleChangeFooter} />
      </div>

    </Window>
  );
};
export default Stream;
