import { Environment, Billboard } from "@react-three/drei";
import Overlay from "../../experiment/Fundamentals/2D_Overlay";
import { useSocketContext } from "../../../services/SocketContext";
import { useAppContext } from "../../../services/AppContext";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

/**
 * 3D Experiment Visualization and Overview Camera Stream
 * 
 * @description Within this recat component, the visualisation of the 3D model or the overview camera stream of the experiment is handled as the background of the React app.
 * 
 * @param {string} height - For scaling the content (is specified in pixels)
 * @param {string} width - For scaling the content (is specified in pixels)
 *  
 * @returns {React.ReactElement} Background of the web application  
 */
const VirtualLayer = (...props) => {
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();


  return (
/*    <Canvas
      style={{
        position: "absolute",
        background: "linear-gradient(Teal, Black)",
        width: "100%",
        height: "100%",
      }}
      colorManagement
      camera={{ position: [0, 0, 5], fov: 40 }}
    >
      <Suspense fallback={null}>
        {/!* <canvas
            id="Canvas"
            width={props.width}
            height={props.height}
            style={{ borderRadius: "5px", backgroundSize: "cover" }}
          /> *!/}

        <Environment files="../hdri/autoshop.hdr" />

        {/!* <pointLight /> *!/}
        <Billboard>
          {/!* Intialisation of the 2D model with the hitboxes and transfer of the most important parameters required within this class. *!/}
          <Overlay
            toggleSelect={appCtx.toggleSelectedComp}
            selected={appCtx.selectedComps}
            //showTags={appCtx.showTags}
            socket={socketCtx.socket}
          />
        </Billboard>
      </Suspense>
    </Canvas>*/
      <Overlay
          toggleSelect={appCtx.toggleSelectedComp}
          selected={appCtx.selectedComps}
          socket={socketCtx.socket}
          showTags={appCtx.showTags}
      />
  );
}


export default VirtualLayer;
