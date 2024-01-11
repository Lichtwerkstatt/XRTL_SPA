/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 AO_230803.glb -k -s
*/

import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import { useGLTF, Box } from "@react-three/drei";
import React, { memo } from "react";
import { isEqual } from "lodash";
import GlassMaterial from "./materials/GlassMaterial";
import LaserMaterial from "./materials/LaserMaterial";

function Model(props) {
  const { nodes, materials } = useGLTF("/model/AO_230803.glb");

  return (
    <group {...props} dispose={null} scale={[5, 5, 5]}>
      {/* Beam Overlay */}

      {props.showBeam && (
        <group>
          <mesh
            name="Beam_eye"
            castShadow
            receiveShadow
            geometry={nodes.Beam_eye.geometry}
          >
            <LaserMaterial />
          </mesh>
          <mesh
            name="Beam_screen"
            castShadow
            receiveShadow
            geometry={nodes.Beam_screen.geometry}
            material={materials.Laser_red}
          >
            <LaserMaterial />
          </mesh>
        </group>
      )}

      <group
        name="LaserPower"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("relay_laser");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.15, 0.05, 0.45]}
            title="Power Supply"
            description="5V Laser Power Supply"
          />
        )}
        <mesh
          name="LaserPower"
          castShadow
          receiveShadow
          geometry={nodes.Netzteil.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("relay_laser") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
      </group>
      <group
        name="AM"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("mirror_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, -0.42]}
            title="Adaptive Mirror"
            description="DMH40-P01 Piezoelectric Deformable Mirror"
          />
        )}
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("mirror_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Cube_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="Cube_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group
        name="Eye"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("eye_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, 0.43]}
            title="Artificial Eye"
            description="Adjustable Diopter and Pupil Size"
          />
        )}
        <mesh
          name="Cylinder069"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder069.geometry}
          material={materials["BlackParts.001"]}
        >
          {props.selected.has("eye_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Cylinder069_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder069_1.geometry}
          material={materials["Glass.001"]}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="Cylinder069_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder069_2.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("eye_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Cylinder069_3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder069_3.geometry}
          material={materials.ShinyParts}
        />
      </group>
      <group
        name="Beamsplitter"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("beamSplitter");
        }}
      >
        <mesh
          name="Cylinder002"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials.BlackParts}
          >
          {props.selected.has("beamSplitter") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, 0.305]}
            title="Beam Splitter"
            description="10:90 Plate Beam Splitter"
          />
        )}
        <mesh
          name="Cylinder002_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_1.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="Cylinder002_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

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
      <mesh
        name="KM100mesh_3"
        castShadow
        receiveShadow
        geometry={nodes.KM100mesh_3.geometry}
        material={materials.Glass}
      >
        <GlassMaterial />
      </mesh>

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
      <mesh
        name="KM100mesh002_3"
        castShadow
        receiveShadow
        geometry={nodes.KM100mesh002_3.geometry}
        material={materials.Glass}
      >
        <GlassMaterial />
      </mesh>

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
            description="Composition of two Lenses"
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
          name="KM100mesh003_3"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh003_3.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
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
        <mesh
          name="KM100mesh004_3"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh004_3.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
      </group>

      <group
        name="Telescope_2"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("telescope_2");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.02, 0.1, -0.24]}
            title="Telescope 2"
            description="Composition of two Lenses"
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
          name="KM100mesh005_3"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh005_3.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
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
        <mesh
          name="KM100mesh006_3"
          castShadow
          receiveShadow
          geometry={nodes.KM100mesh006_3.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
      </group>

      <group
        name="Wavefront Sensor"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("wavesensor_1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.05, 0.1, -0.11]}
            title="Wavefront Sensor"
            description="WFS20-5C/M Shack-Hartmann Sensor"
          />
        )}

        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("wavesensor_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Cube005_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube005_1.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="Cube005_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube005_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group
        name="Pinhole"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("stepper_pinhole");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.01, 0.1, 0.3]}
            title="Pinhole"
            description="ID12/M Post-Mounted Iris Diaphragm"
          />
        )}
        <mesh
          name="Pinhole"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder036.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("stepper_pinhole") ? (
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
        name="LinearStage"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("stepper_linear1");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[0.1, 0.1, 0.15]}
            title="Linear Stage"
            description="XR50P/M Linear Translation Platform"
          />
        )}
        <mesh
          name="XR50P_M-Stepbr_(LeftHanded)001"
          castShadow
          receiveShadow
          geometry={nodes["XR50P_M-Stepbr_(LeftHanded)001"].geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("stepper_linear1") ? (
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
        <mesh
          name="XR50P_M-Stepbr_(LeftHanded)001_2"
          castShadow
          receiveShadow
          geometry={nodes["XR50P_M-Stepbr_(LeftHanded)001_2"].geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
      </group>
      <group
        name="LinearStage"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("prism");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, 0.15]}
            title="Prism"
            description="Right-Angle Prism Mirror"
          />
        )}
        <mesh
          name="Cube008"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Glass}
        >
          <GlassMaterial />
        </mesh>
        <mesh
          name="Cube008_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("prism") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Cube008_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_2.geometry}
          material={materials.ShinyParts}
        />
      </group>

      <group>
        {props.showTags && (
          <DescriptiveTag
            position={[0.12, 0.1, 0.3]}
            title="Light Source"
            description="635 nm Laser Diode Module"
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
        ></mesh>
      </group>

      <group
        name="SelectableScreen"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("servo_screen");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.1, -0.04]}
            title="Screen Retraction"
            description="Moves screen in and out of the beam"
          />
        )}
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Stand_1"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand_1.geometry}
          material={materials["BlackParts.002"]}
        >
          {props.selected.has("servo_screen") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Stand_2"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand_2.geometry}
          material={materials.ShinyParts}
        />
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Stand_3"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand_3.geometry}
          material={materials["ShinyParts.001"]}
        />
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Stand_4"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand_4.geometry}
          material={materials.Servo}
        />
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Stand_5"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand_5.geometry}
          material={materials.BlackParts}
        >
          {props.selected.has("servo_screen") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
      </group>
      <group
        name="SelectableScreen"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("cam_screen");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.12, -0.01]}
            title="Screen"
            description="Simple Retractable Plate"
          />
        )}
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Adapter_1"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Adapter_1.geometry}
          material={materials["BlackParts.002"]}
        >
          {props.selected.has("cam_screen") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="Thorlabs_Servo_Mount_Loose_V1_Adapter_2"
          castShadow
          receiveShadow
          geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Adapter_2.geometry}
          material={materials.WhiteParts}
        />
      </group>

      <group
        name="RotaryStage"
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("stepper_rotation");
        }}
      >
        {props.showTags && (
          <DescriptiveTag
            position={[-0.12, 0.025, 0.46]}
            title="Target Changing Stage"
            description="PR01/M Rotation Stage"
          />
        )}
        <mesh
          name="PR01_M-Step_1"
          castShadow
          receiveShadow
          geometry={nodes["PR01_M-Step_1"].geometry}
          material={materials["BlackParts.003"]}
        >
          {props.selected.has("stepper_rotation") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          name="PR01_M-Step_2"
          castShadow
          receiveShadow
          geometry={nodes["PR01_M-Step_2"].geometry}
          material={materials["ShinyParts.002"]}
        />
      </group>

      <mesh
        name="Plane004"
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials.BlackParts}
      />
      <mesh
        name="Plane004_1"
        castShadow
        receiveShadow
        geometry={nodes.Plane004_1.geometry}
        material={materials.ShinyParts}
      />
    </group>
  );
}

useGLTF.preload("/AO_230803.glb");
export default memo(Model, isEqual);
