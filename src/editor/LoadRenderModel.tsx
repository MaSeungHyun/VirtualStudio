import { Box } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import RenderThreeModel from "./RenderThreeModel";

interface LoadRenderModelProps {
  setSelect: Dispatch<SetStateAction<string>>;
  scale: number;
}
export default function LoadRenderModel({
  setSelect,
  scale,
}: LoadRenderModelProps) {
  const gltf = useLoader(GLTFLoader, "/src/assets/macbook_pro.glb");

  console.log(gltf);

  console.log(gltf.scenes);

  const handleSelect = () => {
    // setSelect("MacBook_M1_Pro_16_inch");
    setSelect(gltf.scene.name);
  };

  // return <RenderThreeModel node={gltf} setSelect={setSelect} scale={scale} />;
  return (
    <primitive
      object={gltf.scene}
      name={gltf.name}
      onPointerDown={handleSelect}
    ></primitive>
  );
}
