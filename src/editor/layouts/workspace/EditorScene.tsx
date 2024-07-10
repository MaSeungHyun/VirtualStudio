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

import styles from "./css/EditorScene.module.css";
import { Controls } from "./Controls";
import { Scene } from "three";
import RenderThreeModel from "../../RenderThreeModel";
import LoadRenderModel from "../../LoadRenderModel";

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
        onPointerMissed={() => {
          setSelect(null);
        }}
      >
        <Controls select={select} />
        <Grid name="grid" {...gridConfig} />

        <directionalLight
          name={"DirectionalLight"}
          intensity={2}
          position={[2, 3, 5]}
          color={"white"}
          castShadow={true}
        />

        <LoadRenderModel scale={1} setSelect={setSelect} />

        <Environment
          resolution={256}
          background
          blur={1}
          files={"/src/assets/sky.hdr"}
        ></Environment>
      </Canvas>
    </div>
  );
};
