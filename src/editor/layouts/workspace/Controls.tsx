import { OrbitControls, TransformControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";

interface ControlsProps {
  select: string | null;
}
export const Controls: FC<ControlsProps> = ({ select }) => {
  const scene = useThree((state) => state.scene);
  const target = scene.getObjectByName(select);
  return (
    <>
      <OrbitControls makeDefault enableDamping={false} />
      {select && <TransformControls object={target} />}
    </>
  );
};
