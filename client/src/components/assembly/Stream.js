import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext"
import { useEffect } from "react";

const Stream = (props) => {
  const socketCtx = useSocketContext();
  const appCtx = useAppContext()

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
    console.log("Stop Streaming.")
    socketCtx.socket.emit("command", {
      userId: "user123",
      componentId: props.id,
      command: "stopStreaming" })
    socketCtx.socket.emit("command", {
        userId: "user123",
        componentId: "laser_1",
        command: { laser: false  }})

  }

  useEffect(() => {
    socketCtx.socket.on('pic', function (data) {
      var uint8Arr = new Uint8Array(data.buffer);
      var binary = '';
      for (var i = 0; i < uint8Arr.length; i++) {
        binary += String.fromCharCode(uint8Arr[i]);
      }
      var base64String = window.btoa(binary);

      var img = new Image();
      img.onload = function () {
        var canvas = document.getElementById('ScreenCanvas');
        var ctx = canvas.getContext('2d');
        var x = 0, y = 0;
        ctx.drawImage(this, x, y);
      }
      img.src = 'data:image/jpg;base64,' + base64String;
    });
  }, [socketCtx.socket])

  useEffect(() => {
    console.log("Start Streaming.")
    socketCtx.socket.emit("command", {
      userId: "user123",
      componentId: props.id,
      command: "startStreaming" })
    socketCtx.socket.emit("command", {
        userId: "user123",
        componentId: "laser_1",
        command: { laser: true} })

  },[])

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="800px"
      height="600px"
      onClose={handleCloseWindow}
    >
      <canvas id='ScreenCanvas' width="800px" height="600px" />
    </Window>
  );
};

export default Stream;