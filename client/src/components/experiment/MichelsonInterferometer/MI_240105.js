/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, memo, useEffect, useState } from "react";
import { useGLTF, Box, Cylinder } from "@react-three/drei";
import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import { isEqual } from "lodash";
import LaserMaterial from "./materials/LaserMaterial";
import { Mesh } from "three";

export function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/model/MI_240105.glb");

  const [beamsplitterState, setBeamsplitterState] = useState(false);
  const [redLEDState, setRedLEDState] = useState(false);
  const [whiteLEDState, setWhiteLEDState] = useState(false);

  const socket = props.socket;

  useEffect(() => {
    const status = (payload) => {
      //console.log(payload.controlId + ": " + payload.status.state);
      //console.log("Status ", payload)

      //convert multi selection tool radio button values to booleans
    
      if(payload.controlId === "experimentSelection") {
        console.log(payload.controlId + ": " + payload.status.state);
        //Beamsplitter
        payload.status.state === "splitter"
        ? setBeamsplitterState(true)
        : setBeamsplitterState(false);

        //Red + White LED
        payload.status.state === "rled"
        ? setRedLEDState(true)
        : setRedLEDState(false)

        payload.status.state === "wled"
        ? setWhiteLEDState(true)
        : setWhiteLEDState(false)
      }

      //console.log("Status ", payload)
    }

  socket.on("status", status);

  return () => {
      socket.removeAllListeners("status", status);
    };
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);


  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Optical elements">
          {/* Glass Materials need to be generated here*/}
          {/* Beam Splitter cube */}
          <Box
            position={[-0.53, 0.76, -0.12]}
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
          {/* Refraction Plate 1 */}
          <Box
            position={[-0.45, 0.6, 0.58]}
            args={[1, 1, 1]}
            scale={[0.5, 0.6, 0.125]}
          >
            <meshPhysicalMaterial
              thickness={1}
              roughness={0.1}
              transmission={1}
              clearcoat={0.5}
              clearcoatRoughness={0}
              ior={1.1}
              envMapIntensity={25}
              color={"#9999ff"}
              attenuationColor={"#00ffff"}
              attenuationDistance={5}
            />
          </Box>
          {/* Refraction Plate 2 */}
          <Box
            position={[0.2, 0.6, 0.44]}
            args={[1, 1, 1]}
            scale={[0.5, 0.6, 0.125]}
          >
            <meshPhysicalMaterial
              thickness={1}
              roughness={0.1}
              transmission={1}
              clearcoat={0.5}
              clearcoatRoughness={0}
              ior={1.1}
              envMapIntensity={25}
              color={"#99ff99"}
              attenuationColor={"#00ffff"}
              attenuationDistance={5}
            />
          </Box>
          {/* Beam Splitter slim is defined in 'off' Overlay*/}

          {/* Lens */}
          <Cylinder
            position={[0.7, 0.77, -0.13]}
            args={[1, 1, 1, 24]}
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
        <group
          name="Mirror1"
          position={[0, 0, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("KM100_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.5, 1, 1.2]}
              title="Reference Mirror"
              description="KM100 Double Rotary Control"
            />
          )}
          <mesh
            name="Mirror1Mesh"
            castShadow
            receiveShadow
            geometry={nodes.Mirror1Mesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("KM100_1") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="Mirror1Mesh_1"
            castShadow
            receiveShadow
            geometry={nodes.Mirror1Mesh_1.geometry}
            material={materials.ShinyParts}
          />

          <mesh
            name="Mirror1Mesh_2"
            castShadow
            receiveShadow
            geometry={nodes.Mirror1Mesh_2.geometry}
            material={materials.Mirror}
          />
        </group>

        <group
          name="Schirm"
          position={[0, 0, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("screen");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.4, 1.5, -1.3]}
              title="Screen"
              description="Screen with Interference Pattern"
            />
          )}
          <mesh
            name="ScreenMesh"
            castShadow
            receiveShadow
            geometry={nodes.ScreenMesh.geometry}
            material={materials.WhiteParts}
          />

          <mesh
            name="ScreenMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.ScreenMesh_1.geometry}
            material={materials.BlackParts}
          />
        </group>
        <group
          name="Laser"
          position={[0, 0, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("greenlaser_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[1.6, 1, -0.15]}
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
              position={[1.8, 0.6, -0.9]}
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

        <group
          name="ExperimentSelectionHolder"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("experimentSelection");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[0.6, 1, -0.65]}
              title="Multi Component Selection"
              description="Custom Revolving Mount"
            />
          )}
          <mesh
            name="LEDHolder"
            castShadow
            receiveShadow
            geometry={nodes.LEDHolder.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("experimentSelection") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BS_slimHolder"
            castShadow
            receiveShadow
            geometry={nodes.BS_slimHolder.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("experimentSelection") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
        </group>

        {!props.showBeam && (
          <group>
            <group
              name="BS_slim"
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="BS_slimMesh"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh.geometry}
                material={materials.BlackParts}
              >
                {props.selected.has("experimentSelection") ? (
                  <meshStandardMaterial
                    color="#00ff00"
                    transparent
                    opacity={0.7}
                  />
                ) : (
                  <meshStandardMaterial color="#222222" opacity={1.0} />
                )}
              </mesh>
              <mesh
                name="BS_slimMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh_1.geometry}
                material={materials.ShinyParts}
              />
            </group>
            <Cylinder
              position={[0.64, 0.77, -0.66]}
              args={[1, 1, 1, 24]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
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
        )}
        {!redLEDState && !whiteLEDState && props.showBeam && (
          <group>
            <mesh
              name="LaserBeam"
              castShadow
              receiveShadow
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
              name="LED"
              position={[0.63, 0, -0.53]}
              rotation={[0, 0, 0]}
              scale={1}
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="LEDMesh"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh.geometry}
                material={materials["ShinyParts.005"]}
              ></mesh>
              <mesh
                name="LEDMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh_1.geometry}
                material={materials["BlackParts.005"]}
              >
                {props.selected.has("experimentSelection") ? (
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
          </group>
        )}

        {!redLEDState && !whiteLEDState && props.showBeam && beamsplitterState && (
          <group>
            <mesh
              name="LaserBeamBS"
              geometry={nodes.LaserBeamBS.geometry}
              material={materials.Laser}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
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
              name="LaserBeam"
              castShadow
              receiveShadow
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
              name="BS_slim"
              position={[-0.64, 0, 0.53]}
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="BS_slimMesh"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh.geometry}
                material={materials.BlackParts}
              >
                {props.selected.has("experimentSelection") ? (
                  <meshStandardMaterial
                    color="#00ff00"
                    transparent
                    opacity={0.7}
                  />
                ) : (
                  <meshStandardMaterial color="#222222" opacity={1.0} />
                )}
              </mesh>
              <mesh
                name="BS_slimMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh_1.geometry}
                material={materials.ShinyParts}
              />
              <Cylinder
                position={[0.64, 0.77, -0.66]}
                // position={[0, 0, 0]}
                args={[1, 1, 1, 24]}
                rotation={[0, -Math.PI / 4, Math.PI / 2]}
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

            <group
              name="LED"
              position={[0.63, 0, -0.53]}
              rotation={[0, 0, 0]}
              scale={1}
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="LEDMesh"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh.geometry}
                material={materials["ShinyParts.005"]}
              ></mesh>
              <mesh
                name="LEDMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh_1.geometry}
                material={materials["BlackParts.005"]}
              >
                {props.selected.has("experimentSelection") ? (
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
          </group>
        )}

        {props.showBeam && whiteLEDState && (
          <group>
            <mesh
              name="LEDLightWhite"
              geometry={nodes.LEDLightWhite.geometry}
              material={materials.LEDWhite}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
            >
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.8}
                emissive
                emissiveIntensity={1}
              />
            </mesh>
            <group
              name="BS_slim"
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="BS_slimMesh"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh.geometry}
                material={materials.BlackParts}
              >
                {props.selected.has("experimentSelection") ? (
                  <meshStandardMaterial
                    color="#00ff00"
                    transparent
                    opacity={0.7}
                  />
                ) : (
                  <meshStandardMaterial color="#222222" opacity={1.0} />
                )}
              </mesh>
              <mesh
                name="BS_slimMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh_1.geometry}
                material={materials.ShinyParts}
              />
            </group>
            <group
              name="LED"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="LEDMesh"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh.geometry}
                material={materials["ShinyParts.005"]}
              ></mesh>
              <mesh
                name="LEDMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh_1.geometry}
                material={materials["BlackParts.005"]}
              >
                {props.selected.has("experimentSelection") ? (
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
              position={[0.64, 0.77, -0.66]}
              args={[1, 1, 1, 24]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
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
        )}

        {props.showBeam && redLEDState && (
          <group>
            <mesh
              name="LEDLightRed"
              geometry={nodes.LEDLightRed.geometry}
              material={materials.LEDRed}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
            >
              <meshStandardMaterial
                color="#ff3900"
                transparent
                opacity={0.8}
                emissive
                emissiveIntensity={1}
              />
            </mesh>
            <group
              name="BS_slim"
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="BS_slimMesh"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh.geometry}
                material={materials.BlackParts}
              >
                {props.selected.has("experimentSelection") ? (
                  <meshStandardMaterial
                    color="#00ff00"
                    transparent
                    opacity={0.7}
                  />
                ) : (
                  <meshStandardMaterial color="#222222" opacity={1.0} />
                )}
              </mesh>
              <mesh
                name="BS_slimMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.BS_slimMesh_1.geometry}
                material={materials.ShinyParts}
              />
            </group>
            <group
              name="LED"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("experimentSelection");
              }}
            >
              <mesh
                name="LEDMesh"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh.geometry}
                material={materials["ShinyParts.005"]}
              ></mesh>
              <mesh
                name="LEDMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.LEDMesh_1.geometry}
                material={materials["BlackParts.005"]}
              >
                {props.selected.has("experimentSelection") ? (
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
              position={[0.64, 0.77, -0.66]}
              args={[1, 1, 1, 24]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
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
        )}

        <group
          name="TranslateMirror"
          position={[-1.85, 0, -0.14]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("linear_1");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[0.3, 0.9, 0]}
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
          name="RotaryStageHeater"
          position={[-1.87, 0, -0.13]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("heater_rotation");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[0, 0.6, -0.5]}
              title="Mirror Changing Stage"
              description="PR01/M Rotation Stage"
            />
          )}
          <mesh
            name="RotaryStageHeaterMesh"
            castShadow
            receiveShadow
            geometry={nodes.RotaryStageHeaterMesh.geometry}
            material={materials["BlackParts.004"]}
          >
            {props.selected.has("heater_rotation") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="RotaryStageHeaterMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.RotaryStageHeaterMesh_1.geometry}
            material={materials.ShinyParts}
          />
        </group>
        <group
          name="ThermalMirror"
          position={[-1.9, 0, -0.2]}
          rotation={[0, -Math.PI / 1, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("heater");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[0, 0.9, 0.5]}
              title="Heatable Mirror Stage"
              description="Mirror Mounted on an Aluminum Rod"
            />
          )}
          <mesh
            name="ThermalMirrorMesh"
            castShadow
            receiveShadow
            geometry={nodes.ThermalMirrorMesh.geometry}
            material={materials["Material.002"]}
          >
            {props.selected.has("heater") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#884422" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="ThermalMirrorMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.ThermalMirrorMesh_1.geometry}
            material={materials["BlackParts.001"]}
          >
            {props.selected.has("heater") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="ThermalMirrorMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.ThermalMirrorMesh_2.geometry}
            material={materials["ShinyParts.001"]}
          />
          <mesh
            name="ThermalMirrorMesh_3"
            castShadow
            receiveShadow
            geometry={nodes.ThermalMirrorMesh_3.geometry}
            material={materials["Alu.001"]}
          />
          <mesh
            name="ThermalMirrorMesh_4"
            castShadow
            receiveShadow
            geometry={nodes.ThermalMirrorMesh_4.geometry}
            material={materials["Mirror.002"]}
          />
          <mesh
            name="ThermalMirrorMesh_5"
            castShadow
            receiveShadow
            geometry={nodes.ThermalMirrorMesh_5.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("heater") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
        </group>

        <group
          name="RotaryStage"
          // position={[-0.12, 0, 0.51]}
          // rotation={[0, -1.57, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("plate_rotation");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.13, 0.7, 0.3]}
              title="Plate Rotation Stage"
              description="PR01/M Rotation Stage"
            />
          )}
          <mesh
            name="RotaryStageMesh"
            castShadow
            receiveShadow
            geometry={nodes["RotaryStageMesh"].geometry}
            material={materials["BlackParts.004"]}
          >
            {props.selected.has("plate_rotation") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>

          <mesh
            name="RotaryStageMesh_1"
            castShadow
            receiveShadow
            geometry={nodes["RotaryStageMesh_1"].geometry}
            material={materials["BlackParts.003"]}
          >
            {props.selected.has("plate_rotation") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>

          <mesh
            name="RotaryStageMesh_2"
            castShadow
            receiveShadow
            geometry={nodes["RotaryStageMesh_2"].geometry}
            material={materials["ShinyParts.003"]}
          />
        </group>

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
        <mesh
          name="BaseMesh_2"
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_2.geometry}
          material={materials["BlackParts.004"]}
        />
        <mesh
          name="BaseMesh_3"
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_3.geometry}
          material={materials["ShinyParts.004"]}
        />
        <mesh
          name="BaseMesh_4"
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_4.geometry}
          material={materials["BlackParts.002"]}
        />
        <mesh
          name="BaseMesh_5"
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_5.geometry}
          material={materials["ShinyParts.002"]}
        />
        <group
          name="BSCube"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("bscube");
          }}
        >
          {props.showTags && (
            <DescriptiveTag
              position={[-0.5, 1, -0.11]}
              title="Beam Splitter Cube"
              description="50:50 Non-Polarizing Beamsplitte"
            />
          )}
          <mesh
            name="BS_cubeMesh"
            castShadow
            receiveShadow
            geometry={nodes.BS_cubeMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("bscube") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BS_cubeMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.BS_cubeMesh_1.geometry}
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
              position={[0.7, 1, -0.11]}
              title="Lens"
              description="Bi-Convex 50mm Focal Length"
            />
          )}
          <mesh
            name="LensMesh"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("lens") ? (
              <meshStandardMaterial color="#00ff00" transparent opacity={0.7} />
            ) : (
              <meshStandardMaterial color="#222222" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="LensMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh_1.geometry}
            material={materials.ShinyParts}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/MI_240105.glb");
export default memo(Model, isEqual);
