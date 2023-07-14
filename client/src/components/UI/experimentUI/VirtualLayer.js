import MIS1_230504 from "../../experiment/MichelsonInterferometer/MIS1_230504";
import Model2d from "../../experiment/MichelsonInterferometer/MIS1_2D_control";
import OpenOTC2D from "../../experiment/openOTC/OpenOTC2D";
import { OrbitControls, Environment, Billboard } from "@react-three/drei";
import { useAppContext } from "../../../services/AppContext";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useSocketContext } from "../../../services/SocketContext";

const VirtualLayer = (...props) => {
  const appCtx = useAppContext();
  const socketCtx = useSocketContext();

  if (appCtx.showVirtualLayer) {
    return (
      <div></div>
    );
  } else {
    return (
      <OpenOTC2D
        toggleSelect={appCtx.toggleSelectedComp}
        selected={appCtx.selectedComps}
      />
      
    );
  }
};

export default VirtualLayer;
