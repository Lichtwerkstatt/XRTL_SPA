import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import { useEffect, useRef } from "react";

const Stream = (props) => {
  const socketCtx = useSocketContext();
  const appCtx = useAppContext();
  const tempWebcam = useRef();
  const tempWebcam2 = useRef();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id);
    console.log("Stop Streaming.");
    socketCtx.socket.emit("leave stream room", { id: props.id, userId: socketCtx.getNewUsername() });
  };

  const webcamEmitPic = () => {
    socketCtx.socket.on("pic", function (data) {
      var uint8Arr = new Uint8Array(data.buffer);
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
          var x = 0,
            y = 0;
          ctx.drawImage(this, x, y);
        }
      };
      img.src = "data:image/jpg;base64," + base64String;
    });
  }

  const webcamStartStreaming = () => {
    console.log("Start Streaming.");
    socketCtx.socket.emit("join stream room", { id: props.id, userId: socketCtx.getNewUsername() });
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
        height="400px"
        onClose={handleCloseWindow}
      >
        <canvas id="ScreenCanvas" width="600px" height="400px" />


      </Window>
  );
};
export default Stream;
