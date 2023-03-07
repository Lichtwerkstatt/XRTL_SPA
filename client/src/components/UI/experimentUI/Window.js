import { IoReloadOutline, IoInformationCircleOutline } from 'react-icons/io5'
import { CgCloseO } from 'react-icons/cg'
import styles from '../CSS/Window.module.css'
import Draggable from 'react-draggable'
import { memo } from 'react'
import { isEqual } from 'lodash';
import { useAppContext } from '../../../services/AppContext';
import { useSocketContext } from '../../../services/SocketContext';
const Window = (props) => {
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  const handleReset = () => {
    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: props.controlId,
      reset: true
    })

    if(props.controlId2){
      socketCtx.socket.emit('command', {
        userId: socketCtx.username,
        controlId: props.controlId2,
        reset: true
      })
    }
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
        {props.footer !== undefined && (
          <div className={styles.windowFooter}>
            <span onClick={props.onInfo}> <IoInformationCircleOutline size={25} /></span>
            <label>{props.footer}</label>
          </div>
        )}
        <div className={styles.windowInfo}>
        </div>
      </div>
    </Draggable>
  )
}
export default memo(Window, isEqual);
