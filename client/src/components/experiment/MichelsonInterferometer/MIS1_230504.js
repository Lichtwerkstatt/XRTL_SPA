/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 MIS1_230504.glb -k
*/

import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import { useGLTF, Box, Cylinder } from "@react-three/drei";
import React, { useRef, memo, useState, useEffect } from "react";
import { isEqual } from "lodash";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/model/MIS1_230504.glb");
  const [beamSplitterState, setBeamSplitterState] = useState(false);
  const socket = props.socket;

  useEffect(() => {
    const status = (payload) => {
      if (payload.controlId === "beamSplitter") {
        //Here a special case of assignment is taken, since the status returns an integer and is converted to a boolean
        payload.status.absolute === 90
          ? setBeamSplitterState(true)
          : setBeamSplitterState(false);

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
      <group name="Scene">
        <group name="Optical elements">
          {/* BeamSplitters and Lens*/}
          <Box
            position={[-0.535, 0.66, -0.12]}
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
          <Cylinder
            position={[0.7, 0.68, -0.13]}
            args={[1, 1, 1, 26]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.14, 0.05, 0.14]}
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
          </Cylinder>
        </group>
        {/* Beam Overlay */}
        {props.showBeam === "off" && (
          <group
            name="BSslim"
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamSplitter");
            }}
          >
            {props.showTags && (
              <DescriptiveTag
                position={[0, 0.6, 0]}
                title="Retractable Beam Splitter"
                description="Simple Plate Beam Splitter"
              />
            )}
            {beamSplitterState === true && (
              <group>
                <mesh
                  name="Thorlabs_Servo_Mount_Loose_V1_Stand"
                  geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand.geometry}
                  material={materials["BlackParts.001"]}
                  position={[-0.01, 0, -0.01]}
                  rotation={[0, Math.PI / 4, 0]}
                  scale={0.01}
                >
                  <mesh
                    name="Cylinder002_1"
                    geometry={nodes.Cylinder002_1.geometry}
                    material={materials["ShinyParts.001"]}
                  />
                  <mesh
                    name="Cylinder002_2"
                    geometry={nodes.Cylinder002_2.geometry}
                    material={materials.Servo}
                  />
                  <mesh
                    name="Thorlabs_Servo_Mount_Loose_V1_Adapter"
                    geometry={
                      nodes.Thorlabs_Servo_Mount_Loose_V1_Adapter.geometry
                    }
                    material={materials["BlackParts.001"]}
                  />
                  {props.selected.has("beamSplitter") ? (
                    <meshStandardMaterial
                      color="#00ff00"
                      transparent
                      opacity={0.7}
                    />
                  ) : (
                    <meshStandardMaterial color="#222222" opacity={1.0} />
                  )}
                </mesh>
                <Cylinder
                  position={[-0.15, 0.65, -0.15]}
                  args={[1, 1, 1, 26]}
                  rotation={[0, Math.PI / -4, Math.PI / 2]}
                  scale={[0.15, 0.02, 0.15]}
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
                </Cylinder>
                <Box
                  position={[-0.15, 0.35, -0.15]}
                  args={[1, 1, 1]}
                  scale={[0.019, 0.4, 0.13]}
                  rotation={[0, Math.PI / -4, Math.PI]}
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
              </group>
            )}
          </group>
        )}
        {props.showBeam === "off" && (
          <group
            name="BSslim"
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamSplitter");
            }}
          >
            {props.showTags && (
              <DescriptiveTag
                position={[0, 0.6, 0]}
                title="Retractable Beam Splitter"
                description="Simple Plate Beam Splitter"
              />
            )}
            {beamSplitterState === false && (
              <group>
                <group>
                  <mesh
                    name="Thorlabs_Servo_Mount_Loose_V1_Stand"
                    geometry={
                      nodes.Thorlabs_Servo_Mount_Loose_V1_Stand.geometry
                    }
                    material={materials["BlackParts.001"]}
                    position={[-0.01, 0, -0.01]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={0.01}
                  >
                    <mesh
                      name="Cylinder002_1"
                      geometry={nodes.Cylinder002_1.geometry}
                      material={materials["ShinyParts.001"]}
                    />
                    <mesh
                      name="Cylinder002_2"
                      geometry={nodes.Cylinder002_2.geometry}
                      material={materials.Servo}
                    />
                    <mesh
                      name="Thorlabs_Servo_Mount_Loose_V1_Adapter"
                      geometry={
                        nodes.Thorlabs_Servo_Mount_Loose_V1_Adapter.geometry
                      }
                      material={materials["BlackParts.001"]}
                      position={[-23, 22, 0]}
                      rotation={[0, 0, -Math.PI / 2]}
                    />
                    {props.selected.has("beamSplitter") ? (
                      <meshStandardMaterial
                        color="#00ff00"
                        transparent
                        opacity={0.7}
                      />
                    ) : (
                      <meshStandardMaterial color="#222222" opacity={1.0} />
                    )}
                  </mesh>
                </group>
                <Cylinder
                  position={[0.15, 0.22, -0.45]}
                  args={[1, 1, 1, 26]}
                  rotation={[0, Math.PI / -4, Math.PI / 2]}
                  scale={[0.15, 0.02, 0.15]}
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
                </Cylinder>
                <Box
                  position={[-0.05, 0.22, -0.25]}
                  args={[1, 1, 1]}
                  scale={[0.019, 0.4, 0.13]}
                  rotation={[Math.PI / 2, 0, Math.PI / 4]}
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
              </group>
            )}
          </group>
        )}
        ;
        {props.showBeam === "on" && beamSplitterState === false && (
          <group>
            <mesh
              name="LaserBeam"
              geometry={nodes.LaserBeam.geometry}
              material={materials.Laser}
            >
              <meshStandardMaterial
                color="#65ff00"
                transparent
                opacity={0.8}
                emissive
                emissiveIntensity={1}
              />
            </mesh>
            <group
              name="BSslim"
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("beamSplitter");
              }}
            >
              {props.showTags && (
                <DescriptiveTag
                  position={[0, 0.6, 0]}
                  title="Retractable Beam Splitter"
                  description="Simple Plate Beam Splitter"
                />
              )}

              <mesh
                name="Thorlabs_Servo_Mount_Loose_V1_Stand"
                geometry={nodes.Thorlabs_Servo_Mount_Loose_V1_Stand.geometry}
                material={materials["BlackParts.001"]}
                position={[-0.01, 0, -0.01]}
                rotation={[0, Math.PI / 4, 0]}
                scale={0.01}
              >
                <mesh
                  name="Cylinder002_1"
                  geometry={nodes.Cylinder002_1.geometry}
                  material={materials["ShinyParts.001"]}
                />
                <mesh
                  name="Cylinder002_2"
                  geometry={nodes.Cylinder002_2.geometry}
                  material={materials.Servo}
                />
                <mesh
                  name="Thorlabs_Servo_Mount_Loose_V1_Adapter"
                  geometry={
                    nodes.Thorlabs_Servo_Mount_Loose_V1_Adapter.geometry
                  }
                  material={materials["BlackParts.001"]}
                  position={[-23, 22, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                />
                {props.selected.has("beamSplitter") ? (
                  <meshStandardMaterial
                    color="#00ff00"
                    transparent
                    opacity={0.7}
                  />
                ) : (
                  <meshStandardMaterial color="#222222" opacity={1.0} />
                )}
              </mesh>
            </group>
            <Cylinder
              position={[0.15, 0.22, -0.45]}
              args={[1, 1, 1, 26]}
              rotation={[0, Math.PI / -4, Math.PI / 2]}
              scale={[0.15, 0.02, 0.15]}
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
            </Cylinder>
            <Box
              position={[-0.05, 0.22, -0.25]}
              args={[1, 1, 1]}
              scale={[0.019, 0.4, 0.13]}
              rotation={[Math.PI / 2, 0, Math.PI / 4]}
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
          </group>
        )}
        {props.showBeam === "on" && beamSplitterState === true && (
          <group>
            <mesh
              name="LaserBeam"
              geometry={nodes.LaserBeam.geometry}
              material={materials.Laser}
            >
              <meshStandardMaterial
                color="#65ff00"
                transparent
                opacity={0.8}
                emissive
                emissiveIntensity={1}
              />
            </mesh>
            <mesh
              name="LaserBeamBS"
              geometry={nodes.LaserBeamBS.geometry}
              material={materials.Laser}
              position={[-0.53, 0.68, -0.13]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={0.17}
            >
              <meshStandardMaterial
                color="#65ff00"
                transparent
                opacity={0.8}
                emissive
                emissiveIntensity={1}
              />
            </mesh>

            <group
              name="BSslim"
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("beamSplitter");
              }}
            >
              {props.showTags && (
                <DescriptiveTag
                  position={[0, 0.6, 0]}
                  title="Retractable Beam Splitter"
                  description="Simple Plate Beam Splitter"
                />
              )}
              {beamSplitterState === true && (
                <group>
                  <mesh
                    name="Thorlabs_Servo_Mount_Loose_V1_Stand"
                    geometry={
                      nodes.Thorlabs_Servo_Mount_Loose_V1_Stand.geometry
                    }
                    material={materials["BlackParts.001"]}
                    position={[-0.01, 0, -0.01]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={0.01}
                  >
                    <mesh
                      name="Cylinder002_1"
                      geometry={nodes.Cylinder002_1.geometry}
                      material={materials["ShinyParts.001"]}
                    />
                    <mesh
                      name="Cylinder002_2"
                      geometry={nodes.Cylinder002_2.geometry}
                      material={materials.Servo}
                    />
                    <mesh
                      name="Thorlabs_Servo_Mount_Loose_V1_Adapter"
                      geometry={
                        nodes.Thorlabs_Servo_Mount_Loose_V1_Adapter.geometry
                      }
                      material={materials["BlackParts.001"]}
                    />
                    {props.selected.has("beamSplitter") ? (
                      <meshStandardMaterial
                        color="#00ff00"
                        transparent
                        opacity={0.7}
                      />
                    ) : (
                      <meshStandardMaterial color="#222222" opacity={1.0} />
                    )}
                  </mesh>
                </group>
              )}
              ;
              <Cylinder
                position={[-0.15, 0.65, -0.15]}
                args={[1, 1, 1, 26]}
                rotation={[0, Math.PI / -4, Math.PI / 2]}
                scale={[0.15, 0.02, 0.15]}
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
              </Cylinder>
              <Box
                position={[-0.15, 0.35, -0.15]}
                args={[1, 1, 1]}
                scale={[0.019, 0.4, 0.13]}
                rotation={[0, Math.PI / -4, Math.PI]}
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
            </group>
          </group>
        )}
        {/* Other Components */}
        <group
          name="Mirror1"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("KM100_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.53, 0.9, 0.94]}
              title="Reference Mirror"
              description="KM100 Double Rotary Control"
            />
          )}
          <mesh
            name="SideMirrorMesh"
            castShadow
            receiveShadow
            geometry={nodes.SideMirrorMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("KM100_1") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="SideMirrorMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.SideMirrorMesh_1.geometry}
            material={materials.ShinyParts}
          />
          <mesh
            name="SideMirrorMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.SideMirrorMesh_2.geometry}
            material={materials.Mirror}
          />
        </group>
        <group
          name="TranslateMirror"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("linear_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-1.71, 0.9, -0.12]}
              title="Linear Movable Mirror"
              description="SM1ZP/M Translation Mount"
            />
          )}
          <mesh
            name="TranslateMirrorMesh"
            castShadow
            receiveShadow
            geometry={nodes.TranslateMirrorMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("linear_1") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="TranslateMirrorMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.TranslateMirrorMesh_1.geometry}
            material={materials.ShinyParts}
          />
          <mesh
            name="TranslateMirrorMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.TranslateMirrorMesh_2.geometry}
            material={materials.Mirror}
          />
        </group>
        <group
          name="Schirm"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("screen");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.37, 1.5, -1.3]}
              title="Screen"
              description="Polystyrene Viewing Screen"
            />
          )}
          <mesh
            name="PlaneMesh"
            castShadow
            receiveShadow
            geometry={nodes.PlaneMesh.geometry}
          >
            {props.selected.has("screen") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#eeeeee" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="PlaneMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.PlaneMesh_1.geometry}
            material={materials.BlackParts}
          />
        </group>
        <group name="Base">
          <mesh
            name="BaseMesh"
            castShadow
            receiveShadow
            geometry={nodes.BaseMesh.geometry}
            material={materials.BlackParts}
          />
          <mesh
            name="BaseMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.BaseMesh_1.geometry}
            material={materials.ShinyParts}
          />
        </group>
        <group
          name="Lens"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("lens");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[0.7, 0.9, -0.1]}
              title="Lens"
              description="Bi-Convex 50mm Focal Length"
            />
          )}

          <mesh
            name="LensMesh001"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh001.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("lens") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="LensMesh001_1"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh001_1.geometry}
            material={materials.ShinyParts}
          />
        </group>
        <group
          name="BeamSplitterCube"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("bscube");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.55, 0.9, -0.13]}
              title="Beam Splitter"
              description="50:50 Cube Beam Splitter"
            />
          )}
          <mesh
            name="BeamSplitterMesh001"
            castShadow
            receiveShadow
            geometry={nodes.BeamSplitterMesh001.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("bscube") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BeamSplitterMesh001_1"
            castShadow
            receiveShadow
            geometry={nodes.BeamSplitterMesh001_1.geometry}
            material={materials.ShinyParts}
          />
        </group>
        <group
          name="Laser"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("greenlaser_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[1.7, 0.9, -0.12]}
              title="Laser Alignment"
              description="KM100 Double Rotary Control"
            />
          )}
          <mesh
            name="LaserMesh"
            castShadow
            receiveShadow
            geometry={nodes.LaserMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("greenlaser_1") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="LaserMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.LaserMesh_1.geometry}
            material={materials.ShinyParts}
          />
        </group>
        <mesh
          name="SD5"
          castShadow
          receiveShadow
          geometry={nodes.SD5.geometry}
          material={materials.BlackParts}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("greenlaserPower_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[2.0, 0.5, -1.1]}
              title="Power Supply"
              description="5V Laser Power Supply"
            />
          )}
          {props.selected.has("greenlaserPower_1") ? (
            <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
          ) : (
            <meshStandardMaterial color="#222222" opacity={1.0} />
          )}
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/MIS1_230504.glb");
export default memo(Model, isEqual);
