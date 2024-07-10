import { Box } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface RenderThreeModelProps {
  node: object;
  setSelect: Dispatch<SetStateAction<string>>;
  scale: number;
}
export default function RenderThreeModel({
  node,
  setSelect,
  scale,
}: RenderThreeModelProps) {
  console.log(node);
  const handleSelect = () => {
    // setSelect("MacBook_M1_Pro_16_inch");
    setSelect(node.name);
  };

  return (
    <primitive
      object={node.scene}
      name={node}
      onPointerDown={handleSelect}
    ></primitive>
  );
}
