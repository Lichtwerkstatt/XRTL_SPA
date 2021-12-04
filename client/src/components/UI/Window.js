import Draggable from "react-draggable"
import styles from "./Window.module.css"

const Window = (props) => {
  console.log("Rendering Window...")
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
              //border: "1px solid yellow",
              cursor: "move",
            }}
          >
            {props.header}
          </span>
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
