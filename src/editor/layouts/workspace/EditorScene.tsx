import {
  Box,
  Environment,
  Grid,
  GridMaterialType,
  OrbitControls,
  PerspectiveCamera,
  Sky,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { RenderThreeModel } from "../../RenderThreeModel";
import styles from "./css/EditorScene.module.css";
import { Controls } from "./Controls";
import { Scene } from "three";

interface EditorSceneProps {
  setScene: Dispatch<SetStateAction<Scene | null>>;
}
export const EditorScene: FC<EditorSceneProps> = ({ setScene }) => {
  const [select, setSelect] = useState("");
  const [gridConfig, setGridConfig] = useState<GridMaterialType>({
    cellSize: 1,
    /** Cell thickness, default: 0.5 */
    cellThickness: 1,
    /** Cell color, default: black */
    cellColor: "#555",
    /** Section size, default: 1 */
    sectionSize: 0.5,
    /** Section thickness, default: 1 */
    sectionThickness: 1,
    /** Section color, default: #2080ff */
    sectionColor: "#aaa",
    /** Follow camera, default: false */
    // followCamera: true,
    /** Display the grid infinitely, default: false */
    infiniteGrid: true,
    /** Fade distance, default: 100 */
    fadeDistance: 40,
    /** Fade strength, default: 1 */
    fadeStrength: 7,
  });

  return (
    <div className={styles.sceneFrame}>
      <Canvas
        orthographic={false}
        camera={{
          fov: 50,
          near: 0.1,
          far: 1000,
          position: [4, 3, 5],
        }}
        onCreated={(state) => {
          setScene(state.scene);
          console.log(state.scene.children);
        }}
        shadows={true}
      >
        <Controls select={select} />
        {/* <Grid name="grid" {...gridConfig} /> */}
        {/* <PerspectiveCamera name={"camera"} /> */}

        {/* <Sky name={"Sky"} sunPosition={[1, 1, 3]} /> */}
        {/* <RenderThreeModel /> */}

        <directionalLight
          name={"DirectionalLight"}
          intensity={2}
          position={[2, 3, 5]}
          color={"white"}
          castShadow={true}
        />

        {/* <RenderThreeModel /> */}
        <mesh
          name={"Box"}
          position={[-2.5, 0, 0]}
          onPointerDown={(e) => {
            setSelect("Box");
          }}
          castShadow={true}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"#acacac"} metalness={0.1} />
        </mesh>
        <mesh
          name={"Sphere"}
          position={[2.5, 0, 0]}
          onPointerDown={(e) => {
            setSelect("Box");
          }}
          castShadow={true}
        >
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial color={"#acacac"} />
        </mesh>
        <group name={"Group1"} castShadow={true}>
          <mesh
            name={"Capsule"}
            position={[0, 0, 0]}
            onPointerDown={(e) => {
              setSelect("Box");
            }}
            castShadow={true}
          >
            <capsuleGeometry args={[1, 1, 8, 16]} />
            <meshStandardMaterial color={"#acacac"} />
          </mesh>
          <group name={"Group2"} castShadow={true}>
            <mesh
              name={"Cone"}
              position={[0, 0, -2]}
              onPointerDown={(e) => {
                setSelect("Box");
              }}
              castShadow={true}
            >
              <coneGeometry args={[1, 2, 33]} />
              <meshStandardMaterial color={"#acacac"} />
            </mesh>
          </group>
        </group>
        <Environment
          resolution={256}
          background
          blur={1}
          files={"/src/assets/sky2.hdr"}
        ></Environment>
      </Canvas>
    </div>
  );
};
