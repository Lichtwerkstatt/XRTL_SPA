import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import { useEffect, useRef } from "react";

const Stream = (props) => {
  const appCtx = useAppContext()
  const cam_1 = useRef();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  useEffect(() => {
    const videoConstraints = {
      height: 150,
      width: 250
    };
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false }).then(stream => {
      cam_1.current.srcObject = stream;
    })
  }, [])

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      width="300px"
      height="250px"
      onClose={handleCloseWindow}
    >
      <video ref={cam_1} playsInline autoPlay />

    </Window>
  );
};

export default Stream;
