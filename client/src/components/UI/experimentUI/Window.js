import { IoInformationCircleOutline, IoCloseCircleOutline, IoSettingsOutline } from 'react-icons/io5' //IoReloadOutline
import { MdOutlineUpdate } from 'react-icons/md'; //MdOutlineCircle
import { ImSection } from 'react-icons/im';
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

  const [topper, setTopper] = useState('')

  const renderOption = {
    para: <ImSection className={styles.icon} size={24} />,
    info: <IoInformationCircleOutline className={styles.iconClose} size={30} />,
    setting: <IoSettingsOutline className={styles.icon} size={25} />,
    none: <div />,
  }

  useEffect(() => {
    if (props.topper === 'none') {
      setTopper('none')
    } else if (props.topper === 'para') {
      setTopper('para')
    } else if (props.topper === undefined) {
      console.log("hallo?")
      setTopper('info')
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

    if (props.id === "overview") {
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

  const handleInformation = () => {
    setInfo(!info)

    if (props.id === 'screen' && appCtx.smallSetting === true) {
      appCtx.smallSettings()
    }

    if (props.id === 'info') {
      topper === 'para' ? setTopper('info') : setTopper('para');
    } else {
      topper === 'info' ? setTopper('setting') : setTopper('info')
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

          <p>
            <span onClick={handleInformation}>
              {renderOption[topper]}
            </span>
            <span onClick={handleCloseWindow}><IoCloseCircleOutline className={styles.iconClose} size={30} /></span>
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

        {props.footer !== 'empty' ?
          <div className={styles.windowFooter}>
            <span onClick={handleInfo}> <MdOutlineUpdate size={25} /></span>
            <label>{footer}</label>
          </div>
          :
          <div />
        }

        <div className={styles.windowInfo}>
        </div>
      </div>
    </Draggable>
  )
}
export default memo(Window, isEqual);