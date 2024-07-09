import { OrbitControls, TransformControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export const Controls = ({ select }) => {
  const scene = useThree((state) => state.scene);

  return (
    <>
      <OrbitControls makeDefault enableDamping={false} />
    </>
  );
};
