import { useSocketContext } from '../../services/SocketContext';
import Settings from '../UI/CtrlUnits/Settings';
import Window from '../UI/experimentUI/Window';
import { useEffect } from 'react';
import styles from './Stream.module.css';

const ESPCamStream = (props) => {
  const socketCtx = useSocketContext();

  useEffect(() => {
    const data = (payload) => {
      var uint8Arr = new Uint8Array(payload.data);
      var binary = '';
      for (var i = 0; i < uint8Arr.length; i++) {
        binary += String.fromCharCode(uint8Arr[i]);
      }
      var base64String = window.btoa(binary);

      var img = new Image();
      img.onload = function () {
        var canvas = document.getElementById('ScreenCanvas');
        if (canvas != null) {
          var ctx = canvas.getContext('2d');
          var x1 = 0,
            y1 = 0,
            x2 = 300,
            y2 = 200;
          ctx.drawImage(this, x1, y1, x2, y2);
        }
      };
      img.src = 'data:image/jpg;base64,' + base64String;
    }

    socketCtx.socket.on('data', data);

    return () => {
      socketCtx.socket.removeAllListeners('data', data)
    }
  }, [socketCtx.socket]);

  useEffect(() => {
    socketCtx.socket.emit('join stream room', { controlId: props.controlId, userId: socketCtx.username });
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Window
      id={props.controlId}
      controlId={props.controlId}
      header={props.title}
      top={props.top}
      left={props.left}
      width='1000px'
      height='430px'
    >
      <div className={styles.Canvas}>
        <canvas id='ScreenCanvas' />
      </div>
      <div className={styles.Settings}>
        <Settings
          component={props.controlId}
          led={props.LED}
        />
      </div>

    </Window>
  );
};
export default ESPCamStream;
