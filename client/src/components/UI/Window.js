import styles from "./Window.module.css";

const Window = (props) => {
  console.log("Rendering Window...");
  return (
    <div
      class="window"
      className={styles.window}
      style={{ top: props.top + "px", left: props.left + "px" }}
    >
      <div class="window_header" className={styles.windowHeader}>
        {props.header}
      </div>
      <div class="window_content" 
        className={styles.windowContent} 
        style={{height: props.height , width: props.width, background:"url("+props.background+")"}}>
        {props.children}
      </div>
      {props.footer !== undefined && (
        <div class="window_footer" className={styles.windowFooter}>
          {props.footer}
        </div>
      )}
    </div>
  );
};

export default Window;
