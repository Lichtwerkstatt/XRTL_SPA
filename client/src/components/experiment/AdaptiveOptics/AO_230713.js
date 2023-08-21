/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 AO_230713.glb -k -s
*/

import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import { useGLTF } from "@react-three/drei";
import React, { memo } from "react";
import { isEqual } from "lodash";
import GlassMaterial from "./materials/GlassMaterial";
import LaserMaterial from "./materials/LaserMaterial";

function Model(props) {
  const { nodes, materials } = useGLTF("/model/AO_230713.glb");

  return (
    <group {...props} dispose={null} scale={[5, 5, 5]}>
      {/* Glass Parts */}
      <mesh
        name="Lens006"
        castShadow
        receiveShadow
        geometry={nodes.Lens006.geometry}
        material={materials["Glass.002"]}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="Lens005"
        castShadow
        receiveShadow
        geometry={nodes.Lens005.geometry}
        material={materials["Glass.002"]}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="Lens004"
        castShadow
        receiveShadow
        geometry={nodes.Lens004.geometry}
        material={materials["Glass.002"]}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="Lens003"
        castShadow
        receiveShadow
        geometry={nodes.Lens003.geometry}
        material={materials["Glass.002"]}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="Lens002"
        castShadow
        receiveShadow
        geometry={nodes.Lens002.geometry}
        material={materials["Glass.002"]}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="Lens001"
        castShadow
        receiveShadow
        geometry={nodes.Lens001.geometry}
        material={materials["Glass.002"]}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="Cube007"
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials["Glass.001"]}
      >
        <GlassMaterial />
      </mesh>

      {/* Beam Overlay */}
      {props.showBeam && (
        <mesh
          name="Beam_eye"
          castShadow
          receiveShadow
          geometry={nodes.Beam_eye.geometry}
        >
          <LaserMaterial />
        </mesh>
      )}

      <group
        name="LaserPower"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("redlaserPower_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.15, 0.05, 0.45]}
            title="Power Supply"
            description="Power Supply description"
          />
        )}
        <mesh
          name="LaserPower"
          castShadow
          receiveShadow
          geometry={nodes.PS.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("redlaserPower_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
      </group>

      <mesh
        name="Beam_blocker"
        castShadow
        receiveShadow
        geometry={nodes.Beam_blocker.geometry}
        material={materials.BlackParts}
      />

      <group
        name="DelayLine"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("linear_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.1, 0.1, 0.15]}
            title="Delay Line"
            description="Delay Line Description"
          />
        )}

        <mesh
          name="PS002"
          castShadow
          receiveShadow
          geometry={nodes.PS002.geometry}
          material={materials["Glass.002"]}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="XR50P_M-Stepbr_(LeftHanded)001"
          castShadow
          receiveShadow
          geometry={nodes["XR50P_M-Stepbr_(LeftHanded)001"].geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("linear_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="XR50P_M-Stepbr_(LeftHanded)001_1"
          castShadow
          receiveShadow
          geometry={nodes["XR50P_M-Stepbr_(LeftHanded)001_1"].geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group name="AdaptiveMirror">
        <mesh
          name="AM"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.BlackParts}
        />
        <mesh
          name="AM_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="AM_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group name="Lens1">
        <mesh
          name="KM100mesh_1"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh_1.geometry}
          material={materials.BlackParts}
        />
        <mesh
          name="KM100mesh_2"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <mesh
        name="KM100mesh002_1"
        castShadow
        receiveShadow
        geometry={nodes.KM100mesh002_1.geometry}
        material={materials.BlackParts}
      />
      <mesh
        name="KM100mesh002_2"
        castShadow
        receiveShadow
        geometry={nodes.KM100mesh002_2.geometry}
        material={materials.ShinyParts}
      />
      <group
        name="Telescope_1"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("telescope_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, -0.13]}
            title="Telescope 1"
            description="Telescope 1 Description"
          />
        )}
        <mesh
          name="KM100mesh003_1"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh003_1.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("telescope_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="KM100mesh003_2"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh003_2.geometry}
          material={materials.ShinyParts}
        />
        <mesh
          name="KM100mesh004_1"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh004_1.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("telescope_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="KM100mesh004_2"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh004_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <mesh
        name="BS"
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.BlackParts}
      />

      <mesh
        name="BS_1"
        castShadow
        receiveShadow
        geometry={nodes.Cube004_1.geometry}
        material={materials.ShinyParts}
      />
      <group
        name="Telescope_2"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("telescope_2");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.02, 0.1, -0.25]}
            title="Telescope 2"
            description="Telescope 2 Description"
          />
        )}
        <mesh
          name="KM100mesh005_1"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh005_1.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("telescope_2") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="KM100mesh005_2"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh005_2.geometry}
          material={materials.ShinyParts}
        />
        <mesh
          name="KM100mesh006_1"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh006_1.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("telescope_2") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="KM100mesh006_2"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh006_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <mesh
        name="SHS"
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.BlackParts}
      />
      <mesh
        name="SHS_1"
        castShadow
        receiveShadow
        geometry={nodes.Cube005_1.geometry}
        material={materials.Glass}
      >
        <GlassMaterial />
      </mesh>
      <mesh
        name="SHS_2"
        castShadow
        receiveShadow
        geometry={nodes.Cube005_2.geometry}
        material={materials.ShinyParts}
      />
      <group
        name="Pinhole"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("pinhole");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, -0.04]}
            title="Pinhole"
            description="Pinhole Description"
          />
        )}
        <mesh
          name="Pinhole"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder036.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("pinhole") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Cylinder036_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder036_1.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group
        name="Eye"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("rotaryStage_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, 0.43]}
            title="The Eye"
            description="His gaze pierces cloud, shadow, earth and flesh."
          />
        )}
        <mesh
          name="Sphere"
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials.sclera_cornea}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="Sphere_1"
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.Iris}
        />
        <mesh
          name="Sphere_2"
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("rotaryStage_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Sphere_3"
          castShadow
          receiveShadow
          geometry={nodes.Sphere_3.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group
        name="Prism"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("KM100B_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, 0.15]}
            title="Prism"
            description="Prism Description"
          />
        )}
        <mesh
          name="PS001"
          castShadow
          receiveShadow
          geometry={nodes.PS001.geometry}
          material={materials["Glass.002"]}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="KM100B"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("KM100B_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="KM100B_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials.ShinyParts}
        />
      </group>
      <group
        name="Laser"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("redlaser_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.12, 0.1, 0.3]}
            title="Laser"
            description="Laser Description"
          />
        )}
        <mesh
          name="Laser"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials.ShinyParts}
        />
        <mesh
          name="Laser_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("redlaser_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
      </group>

      {/* Base */}
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.ShinyParts}
      />
      <mesh
        name="Cube002_1"
        castShadow
        receiveShadow
        geometry={nodes.Cube002_1.geometry}
        material={materials.BlackParts}
      />
    </group>
  );
}

useGLTF.preload("/AO_230713.glb");
export default memo(Model, isEqual);