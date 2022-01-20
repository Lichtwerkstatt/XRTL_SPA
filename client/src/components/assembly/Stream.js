import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import { useEffect } from "react";




const Stream = (props) => {
  const appCtx = useAppContext()

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

/*   useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: false }).then(stream => {
      experimentCam1.current.srcObject = stream;
    })
  }, []) */

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="250px"
      height="150px"
      onClose={handleCloseWindow}
    >
      {/* <video className={styles.videoSt} muted ref={experimentCam1} autoPlay playsInline /> */}
      <RotaryCtrl
        rotation={props.rotation}
        component={props.id}
        control="pos"
        top="35"
        left="150"
      />
    </Window>
  );
};

export default Stream;
