import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { Box } from "@react-three/drei"

const Model = ({ ...props }) => {
  const group = useRef()

  const { nodes, materials } = useGLTF("/model/MI_0612.glb") //define Materials all in Three?

  const glassMaterialProps = {}

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
          color={'#ffffff'}
          attenuationColor={'#00ffff'}
          attenuationDistance={5}
        />
      </Box>
      <group
        position={[-0.64, 0.67, 1.06]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.26}
        onPointerDown={(e) => {
          console.log("Clicked on KM100_1")
          e.stopPropagation()
          props.toggleSelect("KM100_1")
        }}
      >
        <mesh
          geometry={nodes.KM100mesh002.geometry}
          material={nodes.KM100mesh002.material}
        >
          {" "}
          {props.selected.has("KM100_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.KM100mesh002_1.geometry}
          material={nodes.KM100mesh002_1.material}
        />
        <mesh
          geometry={nodes.KM100mesh002_2.geometry}
          material={nodes.KM100mesh002_2.material}
        />
      </group>
      <group
        position={[-1.96, 0.67, 0.13]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.26}
        onPointerDown={(e) => {
          e.stopPropagation()
          props.toggleSelect("SM1ZP_1")
        }}
      >
        <mesh
          geometry={nodes.KM100mesh003.geometry}
          material={nodes.KM100mesh003.material}
        >
          {" "}
          {props.selected.has("SM1ZP_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.KM100mesh003_1.geometry}
          material={nodes.KM100mesh003_1.material}
        />
        <mesh
          geometry={nodes.KM100mesh003_2.geometry}
          material={nodes.KM100mesh003_2.material}
        />
      </group>
      <group
        position={[-0.62, 0.86, -1.12]}
        onPointerDown={(e) => {
          e.stopPropagation()
          props.toggleSelect("EDU-VS1_1")
        }}
      >
        <mesh geometry={nodes.Cube003.geometry} material={materials.WhiteParts}>
          {props.selected.has("EDU-VS1_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#eeeeee" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.Cube003_1.geometry}
          material={nodes.Cube003_1.material}
        />
      </group>
      <group position={[-0.64, 0.67, 0.14]}>
        <mesh
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
        ></mesh>
        <mesh
          geometry={nodes.Cube004_1.geometry}
          material={nodes.Cube004_1.material}
        />
      </group>
      <group
        position={[1.56, 0.67, 0.14]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.11, 0.05, 0.11]}
        // onPointerUp={(e) => {
        //   console.log("Clicked on KM100_2")
        //   e.stopPropagation()
        //   props.toggleSelect("puubs")
        // }}
      >
        <mesh
          geometry={nodes.Cylinder011.geometry}
          material={nodes.Cylinder011.material}
        >
          {props.selected.has("KM100_2") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshBasicMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
        <mesh
          geometry={nodes.Cylinder011_1.geometry}
          material={nodes.Cylinder011_1.material}
        />
      </group>
    </group>
  )
}

export default Model
useGLTF.preload("/model/MI_0612.glb")
