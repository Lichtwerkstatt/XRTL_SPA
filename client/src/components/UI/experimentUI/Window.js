import { IoReloadOutline, IoInformationCircleOutline } from 'react-icons/io5'
import { CgCloseO } from 'react-icons/cg'
import styles from '../CSS/Window.module.css'
import Draggable from 'react-draggable'
import { memo, useEffect } from 'react'
import { isEqual } from 'lodash';
import { useAppContext } from '../../../services/AppContext';
import { useSocketContext } from '../../../services/SocketContext';
import { useState } from 'react';
import { usePopUpContext } from '../../../services/PopUpContext';


const Window = (props) => {
  const [lastChange, setLastChange] = useState(props.lastChange);
  const [alertType, setAlertType] = useState('info');
  var [alert, setAlert] = useState(false);
  const [footer, setFooter] = useState('');

  //console.log(lastChange)

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

    if (props.controlId2) {
      socketCtx.socket.emit('command', {
        userId: socketCtx.username,
        controlId: props.controlId2,
        reset: true
      })
    }
  }

  useEffect(() => {
    const Footer = (payload) => {
      if (payload.controlId === props.controlId) {
        setFooter(String(payload.status))
        var time = new Date();
        setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
        console.log(" Footer ", payload)
      }
    }

    const getFooter = (payload) => {
      if (payload.controlId === props.controlId) {
        setFooter(String(payload.status))
        var time = new Date();
        setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
        console.log("Payload ", payload)
      }
    }

    socketCtx.socket.on('footer', Footer)

    socketCtx.socket.on('getFooter', getFooter);


    return () => {
      socketCtx.socket.removeAllListeners('footer', Footer)
      socketCtx.socket.removeAllListeners('getFooter', getFooter)
    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket])

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
    <Draggable handle='.draggableHandler'>
      <div
        className={styles.window}
        style={{ top: props.top + 'px', left: props.left + 'px' }}
      >
        <div className={styles.windowHeader}>
          <span
            className='draggableHandler' //FIXME draggable doesnt seem to work with inline JSX classes. 
            style={{
              display: 'block',
              width: 'calc(100% - 50px)',
              cursor: 'move',
              float: 'left'
            }}
          >
            {props.header}
          </span>
          <span onClick={handleReset} > <IoReloadOutline size={20} />        </span>
          <span onClick={handleCloseWindow}><CgCloseO size={20} /></span>
        </div>
        <div
          className={styles.windowContent}
          style={{
            height: props.height,
            width: props.width,
            background: 'url(' + props.background + ')',
          }}
        >
          {props.children}
        </div>
        {footer !== undefined && (
          <div className={styles.windowFooter}>
            <span onClick={handleInfo}> <IoInformationCircleOutline size={25} /></span>
            <label>{footer}</label>
          </div>
        )}
        <div className={styles.windowInfo}>
        </div>
      </div>
    </Draggable>
  )
}
export default memo(Window, isEqual);
