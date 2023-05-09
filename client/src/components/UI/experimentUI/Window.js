import { IoInformationCircleOutline, IoCloseCircleOutline } from 'react-icons/io5' //IoReloadOutline
import { MdOutlineUpdate, MdOutlineCircle } from 'react-icons/md';
import { useSocketContext } from '../../../services/SocketContext';
import { usePopUpContext } from '../../../services/PopUpContext';
import { useAppContext } from '../../../services/AppContext';
import styles from '../CSS/Window.module.css';
//import { CgCloseO } from 'react-icons/cg';
import { memo, useEffect } from 'react';
import Draggable from 'react-draggable';
import { isEqual } from 'lodash';
import { useState } from 'react';
import DescriptionHandler from '../ComponentDescription/DescriptionHandler'

const Window = (props) => {
  const [lastChange, setLastChange] = useState(props.lastChange);
  const [alertType, setAlertType] = useState('info');
  const [footer, setFooter] = useState('Initializing... ');
  var [alert, setAlert] = useState(false);
  const [info, setInfo] = useState(true);

  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  useEffect(() => {
    if (props.footer) {
      setFooter('empty');
    }

    const Footer = (payload) => {
      if (props.footer !== 'empty' && props.componentList.includes(payload.controlId)) {
        setFooter(String(payload.status))
        var time = new Date();
        setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
      }
    }

    const getFooter = (payload) => {
      if (props.footer !== 'empty' && props.componentList.includes(payload.controlId)) {
        setFooter(String(payload.status))
        var time = new Date();
        setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
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

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)

    if (props.id === "Cam_1") {
      appCtx.toggleCam();
    }

    if (props.id === "info") {
      appCtx.toggleShowInfoWindow();
    }

    if (props.id === "welcome") {
      appCtx.toggleShowWelcomeWindow();
    }

    if (props.id === "manual") {
      appCtx.toggleShowManualWindow();
    }
  }
  /* 
    const handleReset = () => {
      socketCtx.socket.emit('command', {
        userId: socketCtx.username,
        controlId: props.componentList[0],
        reset: true
      })
  
      if (props.componentList[1]) {
        socketCtx.socket.emit('command', {
          userId: socketCtx.username,
          controlId: props.componentList[1],
          reset: true
        })
      }
    } */

  const handleInformation = () => {
    setInfo(!info)

    if (props.id === 'screen' && appCtx.smallSetting === true) {
      appCtx.smallSettings()
    }
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

  return (
    <Draggable handle='.draggableHandler'>
      <div
        className={styles.window}
        style={{ top: props.top + 'px', left: props.left + 'px', width: props.height + 'px', height: props.height + 'px' }}
      >
        <div className={styles.windowHeader}>
          <span
            className='draggableHandler' //FIXME draggable doesnt seem to work with inline JSX classes. 
            style={{
              display: 'block',
              width: 'calc(100% - 70px)',
              cursor: 'move',
              float: 'left'
            }}
          >
            {props.header}
          </span>
          {/* <span onClick={handleReset} > <IoReloadOutline size={20} />        </span> */}
          <p>


            {props.topper ?

              <span onClick={handleInformation} >
                <MdOutlineCircle size={30} color={(props.topper === 'none') ? '#01bd7d' : '#FFFFFF'} />
              </span>
              :
              <span onClick={handleInformation} >
                <IoInformationCircleOutline size={30} />
              </span>
            }


            <span onClick={handleCloseWindow}><IoCloseCircleOutline size={30} /></span>
          </p>
        </div>
        {info ?
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

          :
          <div
            className={styles.windowContent}
            style={{
              height: props.height,
              width: props.width,

            }}
          >
            <DescriptionHandler height={props.height} component={props.id} />
          </div>
        }
        {footer !== 'empty' && (
          <div className={styles.windowFooter}>
            <span onClick={handleInfo}> <MdOutlineUpdate size={25} /></span>
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