import AO_230712 from "../../experiment/AdaptiveOptics/AO_230712";
import Model2d from "../../experiment/AdaptiveOptics/MIS1_2D_control";
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
          <AO_230712
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
    // socketCtx.socket.emit("command", {
    //   userId: socketCtx.username,
    //   controlId: props.component,
    //   getStatus: true,
    // });

    // appCtx.toogleRoomComp(props.component, true);

    // socketCtx.socket.on("data", Settings.data);

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
          {/* <canvas
            id="Canvas"
            width={props.width}
            height={props.height}
            style={{ borderRadius: "5px", backgroundSize: "cover" }}
          /> */}

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
