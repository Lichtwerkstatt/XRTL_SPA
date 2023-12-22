import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import React, { useRef, memo } from "react";
import { Box } from "@react-three/drei";
import { isEqual } from "lodash";

function Model2d({ ...props }) {
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="BSslim"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("pinhole");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Pinhole"
            description="DESCRIPTION"
          />
        )}
        <Box
          position={[0, 0, 0]}
          args={[2, 2, 0.01]}
          scale={[0.25, 0.25, 0.25]}
        >
          {props.selected.has("pinhole") ? (
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
          props.toggleSelect("KM100B_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Reference Mirror"
            description="KM100 B Double Rotary Control"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("KM100B_1") ? (
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
          props.toggleSelect("rotaryStage_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0, 0.2, 0]}
            title="Rotary Stage"
            description="PR01/M Rotation Stage"
          />
        )}
        <Box args={[2, 2, 0.01]} scale={[0.25, 0.25, 0.25]}>
          {props.selected.has("rotaryStage_1") ? (
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
          props.toggleSelect("redlaser_1");
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
          {props.selected.has("redlaser_1") ? (
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
          props.toggleSelect("redlaserPower_1");
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
          {props.selected.has("redlaserPower_1") ? (
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
