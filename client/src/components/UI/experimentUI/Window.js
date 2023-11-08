import { IoInformationCircleOutline, IoCloseCircleOutline, IoSettingsOutline } from 'react-icons/io5' //IoReloadOutline
import DescriptionHandler from '../../experiment/ComponentDescription/DescriptionHandler'
import { useSocketContext } from '../../../services/SocketContext';
import { usePopUpContext } from '../../../services/PopUpContext';
import { useAppContext } from '../../../services/AppContext';
import { MdOutlineUpdate } from 'react-icons/md'; //MdOutlineCircle
import styles from '../CSS/Window.module.css';
import { ImSection } from 'react-icons/im';
import Draggable from 'react-draggable';
import { memo, useEffect } from 'react';
import { isEqual } from 'lodash';
import { useState } from 'react';
import propTypes from "prop-types";

/**
 * Window component
 * 
 * @description This Recat component takes parameters for the design of the component window and then returns it as a React component to be rendered. 
 * The top and left parameters are used for positioning, and the width and height variables 
 * are used to define the size of the component window. The id and the componentenList contain important controlIds of the component, which is 
 * important for the communication with the microcontroller. Outline images can be optionally displayed by passing the file path.
 * 
 * @param {string} id - controlId 
 * @param {array} componentList - List containing the general controlId or all controlIds of the stepper motors
 * @param {string} header - Text within the topper
 * @param {number} top - Positioning at height
 * @param {number} left - Positioning at width
 * @param {string} width - Width of the window
 * @param {string} height - Height of the window
 * @param {string} background - File path of the image that is displayed within the window
 *  
 * @returns {React.ReactElement} Component window 
 */
const Window = (props) => {
  const [info, setInfo] = useState(props.info === false ? false : true);
  const [lastChange, setLastChange] = useState(props.lastChange);
  const [footer, setFooter] = useState('Initializing... ');
  const [topper, setTopper] = useState('')

  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  // Additional icon to be rendered next to the close icon
  const renderOption = {
    para: <ImSection className={styles.icon} size={24} />, // Legal Notice 
    info: <IoInformationCircleOutline className={styles.iconClose} size={30} />, // Information
    setting: <IoSettingsOutline className={styles.iconClose} size={30} />, // Setting
    none: <IoSettingsOutline className={styles.icon} size={25} color={'#01bd7d'} />, // None
  }

  useEffect(() => {
    // Processing of the transferred topper variable
    if (props.topper === 'none') {
      setTopper('none')
    } else if (props.topper === 'para') {
      setTopper('para')
    } else if (props.topper === undefined) {
      setTopper('info')
    }

    // Handles the updating of the footer after the component has been adjusted
    const Footer = (payload) => {
      if (props.footer !== 'none' && props.componentList.includes(payload.controlId)) {
        setFooter(String(payload.status))
        var time = new Date();
        setLastChange([time.getHours(), time.getMinutes(), time.getSeconds(), time.getDay(), time.getMonth()])
      }
    }

    // Handles the setting of the footer after the component window has been opened
    const getFooter = (payload) => {
      if (props.footer !== 'none' && props.componentList.includes(payload.controlId)) {
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

  // Handles the closing of the component window  
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

  // Handles the change of the icon next to the Close icon when it is clicked.
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

  // Handles the display of the information when the component was last adjusted & and to identify the component via the Overview Cam
  const handleInfo = () => {
    var timeNow = new Date();
    let difH, difMin, difSec = 0;
    var alert = '';

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

    popupCtx.toggleShowPopUp(alert, 'info');

    socketCtx.socket.emit("command", {
      controlId: props.componentList[0],
      identify: 3000,
      color: socketCtx.fontColor,
    })
  }

  return (
    /* Ensures the free movement of the component windows */
    <Draggable handle='.draggableHandler'>
      <div
        className={styles.window}
        style={{ top: props.top + 'px', left: props.left + 'px', width: props.height + 'px', height: props.height + 'px' }}
      >
        {/* Styling of the topper of the component window */}
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
            {/* No Icon or icon next to the close icon */}
            <span onClick={handleInformation}>
              {renderOption[topper]}
            </span>
            {/* Close icon and the onclick-event handling */}
            <span onClick={handleCloseWindow}><IoCloseCircleOutline className={styles.iconClose} size={30} /></span>
          </p>
        </div>

        {/* Display of the control elements or the descriptive text */}
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

        {/* Display of the footer depending on the parameter footers */}
        {props.footer !== 'none' ?
          <div className={styles.windowFooter}>
            <span onClick={handleInfo}> <MdOutlineUpdate size={25} /></span>
            <label>{footer}</label>
          </div>
          :
          <div />
        }
      </div>
    </Draggable>
  )
}

Window.propTypes = {
  id: propTypes.string.isRequired,
  componentList: propTypes.array.isRequired,
  header: propTypes.string.isRequired,
  top: propTypes.oneOfType([propTypes.string, propTypes.number,]).isRequired,
  left: propTypes.oneOfType([propTypes.string, propTypes.number,]).isRequired,
  width: propTypes.string.isRequired,
  height: propTypes.string.isRequired,
  background: propTypes.string
}

export default memo(Window, isEqual);