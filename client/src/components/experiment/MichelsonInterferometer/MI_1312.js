import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Box } from "@react-three/drei";
import DescriptiveTag from "../../UI/DescriptiveTag"

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/MI_1312.glb");

  return (
    <group ref={group} {...props} dispose={null}>
      <Box
        position={[-0.65, 0.66, 0.15]}
        args={[1, 1, 1]}
        scale={[0.25, 0.25, 0.25]}
      >
        <meshPhysicalMaterial
          thickness={1}
          roughness={0.1}
          transmission={1}
          clearcoat={0.5}
          clearcoatRoughness={0}
          ior={1.1}
          envMapIntensity={25}
          color={"#ffffff"}
          attenuationColor={"#00ffff"}
          attenuationDistance={5}
        />
      </Box>
      <group
        position={[-0.64, 0.67, 1.06]}
        rotation={[Math.PI, 0, Math.PI]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("KM100_1");
        }}
      >

        {props.showTags && <DescriptiveTag position={[0, 1, 0]} title="Reference Mirror" description="KM100 Double Rotary Control" />}
        <mesh
          geometry={nodes.SideMirrorMesh.geometry}
          material={nodes.SideMirrorMesh.material}
        >
          {props.selected.has("KM100_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.SideMirrorMesh_1.geometry}
          material={nodes.SideMirrorMesh_1.material}
        />
        <mesh
          geometry={nodes.SideMirrorMesh_2.geometry}
          material={nodes.SideMirrorMesh_2.material}
        />
      </group>
      <group
        position={[-1.96, 0.67, 0.13]}
        rotation={[0, Math.PI / 2, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("SM1ZP_1");
        }}
      >
        {props.showTags && <DescriptiveTag position={[0, 1, 0]} title="Translate Mirror" description="KM100 Single Rotary Control" />}

        <mesh
          geometry={nodes.TranslateMirrorMesh.geometry}
          material={nodes.TranslateMirrorMesh.material}
        >
          {props.selected.has("SM1ZP_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.TranslateMirrorMesh_1.geometry}
          material={nodes.TranslateMirrorMesh_1.material}
        />
        <mesh
          geometry={nodes.TranslateMirrorMesh_2.geometry}
          material={nodes.TranslateMirrorMesh_2.material}
        />
      </group>
      <group
        position={[-0.62, 0.86, -1.22]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("EDU-VS1_1");
        }}
      >
        {props.showTags && <DescriptiveTag position={[0, 1, 0]} title="Screen" />}

        <mesh
          geometry={nodes.PlaneMesh.geometry}
          material={materials.WhiteParts}
        >
          {props.selected.has("EDU-VS1_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#eeeeee" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.PlaneMesh_1.geometry}
          material={nodes.PlaneMesh_1.material}
        />
      </group>
      <group position={[-0.64, 0.67, 0.14]}>
        <mesh
          geometry={nodes.BaseMesh.geometry}
          material={nodes.BaseMesh.material}
        />
        <mesh
          geometry={nodes.BaseMesh_1.geometry}
          material={nodes.BaseMesh_1.material}
        />
      </group>
      <group
        position={[1.56, 0.67, 0.14]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        onPointerDown={(e) => {
          e.stopPropagation()
          props.toggleSelect("KM100_2")
        }}
      >
        {props.showTags && <DescriptiveTag position={[0, 0, -1]} title="Laser Alignment" />}

        <mesh
          geometry={nodes.LaserMesh.geometry}
          material={nodes.LaserMesh.material}
        >{props.selected.has("KM100_2") ? (
          <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
        ) : (
          <meshBasicMaterial color="#222222" opacity={1.0} />
        )}</mesh>
        <mesh
          geometry={nodes.LaserMesh_1.geometry}
          material={nodes.LaserMesh_1.material}
        />
      </group>
      <mesh
        geometry={nodes.SD5.geometry}
        material={nodes.SD5.material}
        position={[1.61, 0.25, -0.9]}
        onPointerDown={(e) => {
          e.stopPropagation()
          props.toggleSelect("LaserPower")
        }}
      >
        {props.selected.has("LaserPower") ? (
          <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
        ) : (
          <meshBasicMaterial color="#222222" opacity={1.0} />
        )}
      </mesh>
    </group>
  );
}
useGLTF.preload("/MI_1312.glb");
