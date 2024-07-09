import { Box } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface RenderThreeModelProps {
  setSelect: Dispatch<SetStateAction<string>>;
}
export const RenderThreeModel = ({ setSelect }) => {
  const gltf = useLoader(GLTFLoader, "/src/assets/macbook_pro.glb");

  const scene = useThree((state) => state.scene);

  const handleSelect = () => {
    setSelect("MacBook_M1_Pro_16_inch");
  };
  return (
    <>
      <primitive
        object={gltf.scene}
        name={"MacBook_M1_Pro_16_inch"}
        onPointerDown={() => {}}
      ></primitive>
    </>
  );
};
