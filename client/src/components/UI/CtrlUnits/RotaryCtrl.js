import { MdOutlineRotateRight, MdOutlineRotateLeft } from 'react-icons/md';
import { useSocketContext } from '../../../services/SocketContext'
import { useAppContext } from '../../../services/AppContext';
import styles from '../CSS/RotaryCtrl.module.css';
import { useState, useEffect } from 'react';

const RotaryCtrl = (props) => {
  const [enteredRotation, setEnteredRotation] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [rotation, setRotation] = useState(0);
  var direction;

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  useEffect(() => {
    const status = (payload) => {
      if (payload.controlId === props.component) {
        setRotation(payload.status.absolute);
        (payload.status.busy) ? setOnlineStatus(false) : setOnlineStatus(true);
      }
    }

    const footer = (payload) => {
      if (payload.controlId === props.component) {
        props.newStatus(String(payload.status))
      }
    }

    const getFooter = (payload) => {
      if (payload.controlId === props.component) {
        setOnlineStatus(payload.online)
        props.newStatus(String(payload.status))
      }
    }

    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: props.component,
      getStatus: true
    });

    socketCtx.socket.emit('getFooter', props.component);

    socketCtx.socket.on('getFooter', getFooter);

    socketCtx.socket.on('footer', footer);

    socketCtx.socket.on('status', status);

    return () => {
      socketCtx.socket.removeAllListeners('status', status)
      socketCtx.socket.removeAllListeners('footer', footer)
      socketCtx.socket.removeAllListeners('getFooter', getFooter)
    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket]);

  const rotCW_Handler = name => (event) => {
    event.preventDefault();
    direction = 0;

    (name === 'left') ? direction = -1 * Number(enteredRotation) : direction = Number(enteredRotation);

    if (direction !== 0) {
      socketCtx.socket.emit('command', {
        userId: socketCtx.username,
        color: socketCtx.fontColor,
        controlId: props.control,
        move: direction
      });

      socketCtx.socket.emit('LED', {
        LED: props.led,
        color: socketCtx.fontColor,
      });

      socketCtx.socket.emit('footer', {
        status: 'Last change by: ' + socketCtx.username,
        controlId: props.component
      });
    }
    appCtx.addLog('User initiated CW rotation on ' + props.component + ' by ' + enteredRotation + ' steps.');
  };

  const changeRotationHandler = (event) => {
    setEnteredRotation(event.target.value);
  };

  return (
    <form className={styles.rotaryCtrl} style={{ top: props.top + 'px', left: props.left + 'px' }}>
      <div className={styles.rotaryCtrl}>
        <span>{Number(rotation)}</span>
        <input
          type='number'
          min='0'
          max='100'
          value={enteredRotation}
          onChange={changeRotationHandler}
        />
      </div>
      <button onClick={rotCW_Handler('left')} className={styles.CtrlLeft} disabled={(socketCtx.connected && onlineStatus) ? false : true}  >
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler('right')} className={styles.CtrlRight} disabled={(socketCtx.connected && onlineStatus) ? false : true}>
        <MdOutlineRotateRight size={28} />
      </button>
    </form>
  );
};
export default RotaryCtrl;