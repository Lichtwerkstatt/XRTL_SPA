import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import DescriptiveTag from "../../UI/DescriptiveTag"

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/model/DL4Y_export1.glb')
  return (
    <group ref={group} {...props} dispose={null}>

      {/* Mirror  */}
      <group position={[-0.89, 0.67, 0.8]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("KM100_1");
        }}
      >
        {props.showTags && <DescriptiveTag position={[0, 1, 0]} title="Reference Mirror" description="KM100 Double Rotary Control" />}
        <mesh geometry={nodes.SideMirrorMesh.geometry} material={nodes.SideMirrorMesh.material}>
        {props.selected.has("KM100_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
          </mesh>
        <mesh geometry={nodes.SideMirrorMesh_1.geometry} material={nodes.SideMirrorMesh_1.material} />
        <mesh geometry={nodes.SideMirrorMesh_2.geometry} material={materials.Mirror} />
      </group>

      {/* Screen */}
      <group position={[-0.89, 0.86, -1.12]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("screen");
        }}
      >
        {props.showTags && <DescriptiveTag position={[0, 1.4, 0]} title="Screen" description="" />}
        <mesh geometry={nodes.PlaneMesh.geometry} material={materials.WhiteParts}>
        {props.selected.has("screen") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#eeeeee" opacity={1.0} />
          )}
          </mesh>
        <mesh geometry={nodes.PlaneMesh_1.geometry} material={nodes.PlaneMesh_1.material} />
      </group>

      {/* Laser */}
      <group position={[1.25, 0.67, 0.88]}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("Laser");
        }}      
      >
        {props.showTags && <DescriptiveTag position={[0, 1, 0]} title="Laser" description="green Laserpointer" />}
        <mesh geometry={nodes.LaserMesh.geometry}  material={nodes.LaserMesh.material} >
        {props.selected.has("Laser") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
          </mesh>
        <mesh geometry={nodes.LaserMesh_1.geometry} material={nodes.LaserMesh_1.material} />
      </group>

      {/* Iris */}
      <group position={[-0.92, 0.49, -0.14]}
         onPointerDown={(e) => {
          e.stopPropagation();
          props.toggleSelect("iris");
        }}      
      >
        {props.showTags && <DescriptiveTag position={[0, 1.4, 0]} title="Iris" description="Controllable 15mm Iris Diaphragm" />}
        <mesh geometry={nodes.ID15Mesh.geometry} material={nodes.ID15Mesh.material}>
        {props.selected.has("iris") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
          </mesh>
        <mesh geometry={nodes.ID15Mesh_1.geometry} material={nodes.ID15Mesh_1.material} />
      </group>

      {/* Baseplate */}
      <mesh geometry={nodes.Base.geometry} material={nodes.Base.material} />
      
    </group>

        
  )
}

useGLTF.preload('/model/DL4Y_export1.glb')
