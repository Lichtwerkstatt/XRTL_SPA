import { MdOutlineRotateRight, MdOutlineRotateLeft } from 'react-icons/md';
import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import { usePopUpContext } from "../../../services/PopUpContext";
import styles from '../CSS/RotaryCtrl.module.css';
import { useState, useEffect } from 'react';
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * RotaryCtrl component
 * 
 * @description This React component returns the control RotaryCtrl, which consists of two buttons. The class must be given the controlId of the component, 
 * as well as top and left for the positioning of the entire element.
 * 
 * @param {string} component - controlId 
 * @param {string} top - Height positioning of the component inside the window 
 * @param {string} left - Positioning from the left edge of the component
 * 
 * @returns {React.ReactElement} RotaryCtrl control element
 */
const RotaryCtrl = (props) => {
  const [enteredRotation, setEnteredRotation] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [rotation, setRotation] = useState(0);
  var direction;

  const appCtx = useAppContext();
  const popupCtx = usePopUpContext();
  const socketCtx = useSocketContext();
  const { t } = useTranslation();

  useEffect(() => {
    const status = (payload) => {
      if (payload.controlId === props.component) {
        setOnlineStatus(true)
        setRotation(payload.status.absolute);
        (payload.status.busy) ? setOnlineStatus(false) : setOnlineStatus(true);
      }
    }

    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: props.component,
      getStatus: true
    });

    socketCtx.socket.emit('getFooter', props.component);

    socketCtx.socket.on('status', status);

    return () => {
      socketCtx.socket.removeAllListeners('status', status)

    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket]);

  const rotCW_Handler = name => (event) => {
    event.preventDefault();
    direction = 0;

    // Differentiation whether left or right button was clicked and therefore a negative or positive number must be sent to the server
    (name === 'left') ? direction = -1 * Number(enteredRotation) : direction = Number(enteredRotation);

    // Prevents sending 0 to the server and displays a popup message instead
    if (direction !== 0) {
      socketCtx.socket.emit('command', {
        userId: socketCtx.username,
        controlId: props.component,
        move: direction,
        color: socketCtx.fontColor,
      });

      socketCtx.socket.emit('footer', {
        status: 'Used by: ' + socketCtx.username.substring(0, 17),
        controlId: props.component
      });
    } else {
      popupCtx.toggleShowPopUp(t('messages.values_greater_than_zero'), 'warning');
    }
    appCtx.addLog('User initiated CW rotation on ' + props.component + ' by ' + enteredRotation + ' steps.');
  };

  // Handles the entered number
  const changeRotationHandler = (event) => {
    // Prevents the input of negative numbers
    if (event.target.value > -1) {
      setEnteredRotation(event.target.value);
    }
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
      <button onClick={rotCW_Handler('left')} className={styles.CtrlLeft} disabled={(socketCtx.connected && onlineStatus) ? false : true}>
        <MdOutlineRotateLeft size={28} />
      </button>
      <button onClick={rotCW_Handler('right')} className={styles.CtrlRight} disabled={(socketCtx.connected && onlineStatus) ? false : true}>
        <MdOutlineRotateRight size={28} />
      </button>
    </form>
  );
};

RotaryCtrl.propTypes = {
  component: propTypes.string.isRequired,
  top: propTypes.string.isRequired,
  left: propTypes.string.isRequired,
}

export default RotaryCtrl;