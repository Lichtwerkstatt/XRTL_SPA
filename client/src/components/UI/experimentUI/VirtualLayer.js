import { OrbitControls, Environment } from "@react-three/drei";
import Model3d from "../../experiment/MichelsonInterferometer/MI_230201";
import { useSocketContext } from "../../../services/SocketContext";
import Model2d from "../../experiment/2D Model/2D_MI_Overlay";
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

  if (!appCtx.showVirtualLayer) {
    // 3D model of the experiment
    return (
      /* Handles the colour gradient of the background */
      <Canvas
        style={{
          position: "absolute",
          background: "linear-gradient(Teal, Black)",
          width: "100%",
          height: "100%",
        }}
        /* Enable the automatic conversion of colors according to the renderer's configured color space */
        colorManagement
        softShadows
        /* Positioning of the viewpoint */
        camera={{ position: [5, 4, 5], fov: 30 }}
      >
        {/* Display a fallback until its children have finished loading */}
        <Suspense fallback={null}>
          <Environment files="../hdri/autoshop.hdr" />
          {/* Handles the ambient rotation of the experiment */}
          <OrbitControls autoRotate={appCtx.autoRotate} />
          {/* Intialisation of the 3D model and transfer of the most important parameters required within this class. */}
          <Model3d
            toggleSelect={appCtx.toggleSelectedComp}
            selected={appCtx.selectedComps}
            showTags={appCtx.showTags}
            showBeam={appCtx.showBeam}
            showLED={appCtx.showLED}
            socket={socketCtx.socket}
          />
        </Suspense>
      </Canvas>
    );
  } else {
    // To display the OverviewCam as a VirtualLayer
    return (
      <Model2d
        toggleSelect={appCtx.toggleSelectedComp}
        selected={appCtx.selectedComps}
        socket={socketCtx.socket}
      />
    );
  }
};

export default VirtualLayer;