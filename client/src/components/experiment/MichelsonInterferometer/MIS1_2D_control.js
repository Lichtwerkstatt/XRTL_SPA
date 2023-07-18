import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import React, { useRef, memo, useEffect } from "react";
import { Box } from "@react-three/drei";
import { isEqual } from "lodash";

function Model2d({ ...props }) {
  const group = useRef();
  const socket = props.socket;

  useEffect(() => {
    const status = (payload) => {
      if (payload.controlId === "") {

        // console.log("Status  ", payload)
      } else if (payload.controlId === "OtherComponent") {
        //Normal case of assignment
        //setRotation(payload.status.absolute);
      }
    };

    socket.on("status", status);

    return () => {
      socket.removeAllListeners("status", status);
    };
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="BSslim"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("beamSplitter");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Retractable Beam Splitter"
            description="Simple Plate Beam Splitter"
          />
        )}
        <Box
          position={[0, 0, 0]}
          args={[2, 2, 0.01]}
          scale={[0.25, 0.25, 0.25]}
        >
          {props.selected.has("beamSplitter") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="Mirror1"
        position={[-1, -1, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("KM100_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Reference Mirror"
            description="KM100 Double Rotary Control"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("KM100_1") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="TranslateMirror"
        position={[-2, 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("linear_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Linear Movable Mirror"
            description="SM1ZP/M Translation Mount"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("linear_1") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="Schirm"
        position={[-1, 1, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("screen");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Screen"
            description="Polystyrene Viewing Screen"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("screen") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="Lens"
        position={[1, 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("lens");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Lens"
            description="Bi-Convex 50mm Focal Length"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("lens") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="BeamSplitterCube"
        position={[-1, 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("bscube");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Beam Splitter"
            description="50:50 Cube Beam Splitter"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("bscube") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="Laser"
        position={[2, 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("greenlaser_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Laser Alignment"
            description="KM100 Double Rotary Control"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("greenlaser_1") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>

      <group
        name="SD5"
        position={[2, 1, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("greenlaserPower_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Power Supply"
            description="5V Laser Power Supply"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("greenlaserPower_1") ? (
            <meshStandardMaterial color={"#00ff00"} transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#ffffff" opacity={0.5} />
          )}
        </Box>
      </group>
    </group>
  );
}

export default memo(Model2d, isEqual);
