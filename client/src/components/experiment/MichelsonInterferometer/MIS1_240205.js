/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 MIS1_240205.glb -k
*/

import DescriptiveTag from "../../UI/experimentUI/DescriptiveTag";
import { useGLTF } from "@react-three/drei";
import React, { useRef, memo, useState, useEffect } from "react";
import { isEqual } from "lodash";
import GlassMaterial from "./materials/GlassMaterial";
import LaserMaterial from "./materials/LaserMaterial";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/model/MIS1_240205.glb");
  const [beamSplitterState, setBeamSplitterState] = useState(false);
  const [beamBlocker1State, setBeamBlocker1State] = useState(false);
  const [beamBlocker2State, setBeamBlocker2State] = useState(false);
  const socket = props.socket;
  let highlightcolor = "#01bd7d";
  let basiccolor = "#222222";

  useEffect(() => {
    const status = (payload) => {
      if (payload.controlId === "beamSplitter") {
        //Here a special case of assignment is taken, since the status returns an integer and is converted to a boolean
        payload.status.absolute === 90
          ? setBeamSplitterState(true)
          : setBeamSplitterState(false);

        // console.log("Status  ", payload)
      } else if (payload.controlId === "servo_bblock_1") {
        payload.status.absolute > 40
          ? setBeamBlocker1State(true)
          : setBeamBlocker1State(false);
      } else if (payload.controlId === "servo_bblock_2") {
        payload.status.absolute > 40
          ? setBeamBlocker2State(true)
          : setBeamBlocker2State(false);
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
        {/* Beam Overlay */}

        {props.showBeam && (
          <mesh
            name="LaserBeam"
            geometry={nodes.LaserBeam.geometry}
            material={materials.Laser}
          >
            <LaserMaterial />
          </mesh>
        )}
        {props.showBeam &&
          beamSplitterState &&
          (!beamBlocker1State || !beamBlocker2State) && (
            <mesh
              name="LaserBeamBS"
              geometry={nodes.LaserBeamBS.geometry}
              material={materials.Laser}
            >
              <LaserMaterial />
            </mesh>
          )}
        {props.showBeam && !beamBlocker1State && (
          <mesh
            name="LaserBeamBB1"
            geometry={nodes.LaserBeamBB1.geometry}
            material={materials.Laser}
          >
            <LaserMaterial />
          </mesh>
        )}
        {props.showBeam && !beamBlocker2State && (
          <mesh
            name="LaserBeamBB2"
            geometry={nodes.LaserBeamBB2.geometry}
            material={materials.Laser}
          >
            <LaserMaterial />
          </mesh>
        )}

        {/* movable controllable Parts */}

        {!beamSplitterState && (
          <group
            name="BSslim"
            position={[-0.16, 0.15, 0.16]}
            // rotation={[0, 0, -Math.PI / 2]}
            // rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
            rotation={[-Math.PI / 4.1, Math.PI / 8.7, -Math.PI / 4.0]}
            
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamSplitter");
            }}
          >
            <mesh
              name="BeamSplitterMesh_1"
              castShadow
              receiveShadow
              geometry={nodes.BeamSplitterMesh_1.geometry}
              material={materials.Glass}
            >
              <GlassMaterial />
            </mesh>
            <mesh
              name="BeamSplitterMesh"
              geometry={nodes.BeamSplitterMesh.geometry}
              material={materials["BlackParts"]}
            >
              {props.selected.has("beamSplitter") ? (
                <meshStandardMaterial
                  color={highlightcolor}
                  transparent
                  opacity={0.7}
                />
              ) : (
                <meshStandardMaterial color={basiccolor} opacity={1.0} />
              )}
            </mesh>
          </group>
        )}
        {beamSplitterState && (
          <group>
            <group
              name="BSslim"
              onPointerDown={(e) => {
                e.stopPropagation();
                props.toggleSelect("beamSplitter");
              }}
            >
              <mesh
                name="BeamSplitterMesh_1"
                castShadow
                receiveShadow
                geometry={nodes.BeamSplitterMesh_1.geometry}
                material={materials.Glass}
              >
                <GlassMaterial />
              </mesh>
              <mesh
                name="BeamSplitterMesh"
                geometry={nodes.BeamSplitterMesh.geometry}
                material={materials["BlackParts"]}
              >
                {props.selected.has("beamSplitter") ? (
                  <meshStandardMaterial
                    color={highlightcolor}
                    transparent
                    opacity={0.7}
                  />
                ) : (
                  <meshStandardMaterial color={basiccolor} opacity={1.0} />
                )}
              </mesh>
            </group>
          </group>
        )}
        {beamBlocker1State && (
          <mesh
            name="BeamBlocker1"
            castShadow
            receiveShadow
            geometry={nodes.BeamBlocker1.geometry}
            material={materials.BlackParts}
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamblocker1");
            }}
          >
            {props.selected.has("beamblocker1") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
        )}
        {!beamBlocker1State && (
          <mesh
            name="BeamBlocker1"
            position={[0, 0.35, -0.1]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
            geometry={nodes.BeamBlocker1.geometry}
            material={materials.BlackParts}
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamblocker1");
            }}
          >
            {props.selected.has("beamblocker1") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
        )}
        {beamBlocker2State && (
          <mesh
            name="BeamBlocker2"
            castShadow
            receiveShadow
            geometry={nodes.BeamBlocker2.geometry}
            material={materials.BlackParts}
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamblocker2");
            }}
          >
            {props.selected.has("beamblocker2") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
        )}
        {!beamBlocker2State && (
          <mesh
            name="BeamBlocker2"
            position={[-0.55, -0.15, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            castShadow
            receiveShadow
            geometry={nodes.BeamBlocker2.geometry}
            material={materials.BlackParts}
            onPointerDown={(e) => {
              e.stopPropagation();
              props.toggleSelect("beamblocker2");
            }}
          >
            {props.selected.has("beamblocker2") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
        )}

        {/* Other Components */}

        <group
          name="BSHolder"
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
            name="BSHolderMesh"
            geometry={nodes.BSHolderMesh.geometry}
            material={materials["BlackParts.001"]}
          >
            {props.selected.has("beamSplitter") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BSHolderMesh_1"
            geometry={nodes.BSHolderMesh_1.geometry}
            material={materials["ShinyParts"]}
          />
          <mesh
            name="BSHolderMesh_2"
            geometry={nodes.BSHolderMesh_2.geometry}
            material={materials.Servo}
          />
        </group>

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
            name="RefMirrorMesh"
            castShadow
            receiveShadow
            geometry={nodes.RefMirrorMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("KM100_1") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="RefMirrorMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.RefMirrorMesh_1.geometry}
            material={materials.ShinyParts}
          />
          <mesh
            name="RefMirrorMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.RefMirrorMesh_2.geometry}
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
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
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
            name="SchirmMesh"
            castShadow
            receiveShadow
            geometry={nodes.SchirmMesh.geometry}
          >
            {props.selected.has("screen") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color="#eeeeee" opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="SchirmMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.SchirmMesh_1.geometry}
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
            name="LensMesh"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh.geometry}
            material={materials.Glass}
          >
            <GlassMaterial />
          </mesh>

          <mesh
            name="LensMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh_1.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("lens") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="LensMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.LensMesh_2.geometry}
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
            name="BeamSplitterCubeMesh"
            castShadow
            receiveShadow
            geometry={nodes.BeamSplitterCubeMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("bscube") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BeamSplitterCubeMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.BeamSplitterCubeMesh_1.geometry}
            material={materials.ShinyParts}
          />
          <mesh
            name="BeamSplitterCubeMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.BeamSplitterCubeMesh_2.geometry}
            material={materials.Glass}
          >
            <GlassMaterial />
          </mesh>
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
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
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
        <group
          name="Netzteil"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("greenlaserPower_1");
          }}
        >
          <mesh
            name="NetzteilMesh"
            castShadow
            receiveShadow
            geometry={nodes.NetzteilMesh.geometry}
            material={materials.BlackParts}
          >
            {props.showTags && (
              <DescriptiveTag
                position={[2.0, 0.5, -1.1]}
                title="Power Supply"
                description="5V Laser Power Supply"
              />
            )}
            {/* <HighlightMaterial id="componentId" /> */}

            {props.selected.has("greenlaserPower_1") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="NetzteilMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.NetzteilMesh_1.geometry}
            material={materials.Glass}
          />
          <mesh
            name="NetzteilMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.NetzteilMesh_2.geometry}
            material={materials.RedParts}
          />
        </group>
        <group
          name="BB1Holder"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("beamblocker1");
          }}
        >
          <mesh
            name="BB1HolderMesh"
            castShadow
            receiveShadow
            geometry={nodes.BB1HolderMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("beamblocker1") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BB1HolderMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.BB1HolderMesh_1.geometry}
            material={materials.ShinyParts}
          >
            {props.showTags && (
              <DescriptiveTag
                position={[-0.97, 0.65, 0.12]}
                title="Retract. Beam Blocker 1"
                description="Simple Plate Beam Blocker"
              />
            )}
          </mesh>
          <mesh
            name="BB1HolderMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.BB1HolderMesh_2.geometry}
            material={materials.Servo}
          />
        </group>
        <group
          name="BB2Holder"
          onPointerDown={(e) => {
            e.stopPropagation();
            props.toggleSelect("beamblocker2");
          }}
        >
          <mesh
            name="BB2HolderMesh"
            castShadow
            receiveShadow
            geometry={nodes.BB2HolderMesh.geometry}
            material={materials.BlackParts}
          >
            {props.selected.has("beamblocker2") ? (
              <meshStandardMaterial
                color={highlightcolor}
                transparent
                opacity={0.7}
              />
            ) : (
              <meshStandardMaterial color={basiccolor} opacity={1.0} />
            )}
          </mesh>
          <mesh
            name="BB2HolderMesh_1"
            castShadow
            receiveShadow
            geometry={nodes.BB2HolderMesh_1.geometry}
            material={materials.ShinyParts}
          >
            {props.showTags && (
              <DescriptiveTag
                position={[-0.37, 0.65, 0.575]}
                title="Retract. Beam Blocker 2"
                description="Simple Plate Beam Blocker"
              />
            )}
          </mesh>
          <mesh
            name="BB2HolderMesh_2"
            castShadow
            receiveShadow
            geometry={nodes.BB2HolderMesh_2.geometry}
            material={materials.Servo}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/MIS1_240205.glb");
export default memo(Model, isEqual);
