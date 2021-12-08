import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {OrbitControls, Environment} from "@react-three/drei"
import MI_0612 from "../experiment/MichelsonInterferometer/MI_0612"
import { useAppContext } from "../../services/AppContext"

const VirtualLayer = () => {

  const appCtx = useAppContext();

  if (appCtx.showVirtualLayer)
  {return (
    <Canvas
      style={{ position:"absolute", background: "linear-gradient(Teal, Black)", width:"100%", height:"100%" }}
      colorManagement
      softShadows
      camera={{ position: [0, 3, 5], fov: 40 }}
    >
      <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <OrbitControls autoRotate={appCtx.autoRotate} />
          <MI_0612 />
      </Suspense>
    </Canvas>
  );} else {
    return <></>
  }
};

export default VirtualLayer;
