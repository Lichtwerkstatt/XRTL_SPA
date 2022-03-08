import Draggable from "react-draggable"
import styles from "./Window.module.css"
import {CgClose, CgCloseO} from "react-icons/cg"

const Window = (props) => {

   return (
    <Draggable handle=".draggableHandler">
      <div
        className={styles.window}
        style={{ top: props.top + "px", left: props.left + "px" }}
      >
        <div className={styles.windowHeader}>
          <span
            className="draggableHandler" //FIXME draggable doesnt seem to work with inline JSX classes. 
            style={{
              display: 'block',
              width: "calc(100% - 50px)",
              cursor: "move",
              float: "left"
            }}
          >
            {props.header}
          </span>
           {/* TODO : Add Status Retrievel Button 
            TODO: Add Reset Component Button
           */}
          <div className={styles.windowHeaderIcon} onClick={props.onClose}><CgCloseO size={20}/></div>
        </div>
        <div
          className={styles.windowContent}
          style={{
            height: props.height,
            width: props.width,
            background: "url(" + props.background + ")",
          }}
        >
          {props.children}
        </div>
        {props.footer !== undefined && (
          <div className={styles.windowFooter}>{props.footer}</div>
        )}
      </div>
    </Draggable>
  )
}

export default Window
