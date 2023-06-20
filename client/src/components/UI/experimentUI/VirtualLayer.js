import MIS1_230504 from "../../experiment/MichelsonInterferometer/MIS1_230504";
import Model2d from "../../experiment/MichelsonInterferometer/MIS1_2D_control";
import { OrbitControls, Environment, Billboard } from "@react-three/drei";
import { useAppContext } from "../../../services/AppContext";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useSocketContext } from "../../../services/SocketContext";

const VirtualLayer = () => {
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  if (appCtx.showVirtualLayer) {
    return (
      <Canvas
        style={{
          position: "absolute",
          background: "linear-gradient(Teal, Black)",
          width: "100%",
          height: "100%",
        }}
        colorManagement
        softShadows
        camera={{ position: [0, 3, 5], fov: 40 }}
      >
        <Suspense fallback={null}>
          <Environment files="../hdri/autoshop.hdr" />
          <OrbitControls autoRotate={appCtx.autoRotate} />
          <MIS1_230504
            toggleSelect={appCtx.toggleSelectedComp}
            selected={appCtx.selectedComps}
            showTags={appCtx.showTags}
            showBeam={appCtx.showBeam}
            socket={socketCtx.socket}
          />
        </Suspense>
      </Canvas>
    );
  } else {
    // Hier kommt die Camera hin!
    return (
      <Canvas
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
          <Environment files="../hdri/autoshop.hdr" />

          {/* <pointLight /> */}
          <Billboard>
            <Model2d
              toggleSelect={appCtx.toggleSelectedComp}
              selected={appCtx.selectedComps}
              showTags={appCtx.showTags}
              socket={socketCtx.socket}
            />
          </Billboard>
        </Suspense>
      </Canvas>
    );
  }
};

export default VirtualLayer;
