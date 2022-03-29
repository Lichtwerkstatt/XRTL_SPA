import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
//import MI_1312 from "../experiment/MichelsonInterferometer/MI_1312";
import DigiLab4You from "../experiment/digilab4You/DL4Y_export1";
import { useAppContext } from "../../services/AppContext";

const VirtualLayer = () => {
  const appCtx = useAppContext();

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
          {/* <Stats showPanel={0}  /> */}
          <Environment files="../hdri/autoshop.hdr" />
          <OrbitControls autoRotate={appCtx.autoRotate} />
          <DigiLab4You
            toggleSelect={appCtx.toggleSelectedComp}
            selected={appCtx.selectedComps}
            showTags={appCtx.showTags}
          />
        </Suspense>
      </Canvas>
    );
  } else {
    return <></>;
  }
};

export default VirtualLayer;
