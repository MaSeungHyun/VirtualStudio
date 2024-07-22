import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Dispatch, SetStateAction, useRef } from "react";

interface LoadRenderModelProps {
  setSelect: Dispatch<SetStateAction<string>>;
  scale: number;
}

export default function LoadRenderModel({
  setSelect,
  scale,
}: LoadRenderModelProps) {
  const gltf = useLoader(GLTFLoader, "/src/assets/macbook_pro.glb");

  const handleSelect = (name: string) => {
    setSelect("macBookGroup");
  };

  return (
    <group name={"macBookGroup"} scale={scale} onPointerDown={handleSelect}>
      <primitive object={gltf.scene} />;
    </group>
  );
  // // element별 오브젝트 분할 렌더
  // const renderElements = (element) => {
  //   if (element instanceof Mesh) {
  //     console.log("mesh");
  //     return <mesh geometry={element.geometry} material={element.material} />;
  //   } else if (element instanceof Object3D) {
  //     console.log("OBJ");
  //     return <primitive object={element} />;
  //   } else if (element instanceof Light) {
  //     console.log("LIGHT");
  //     return <primitive object={element} />;
  //   } else {
  //     console.log(element);
  //     return null;
  //   }
  // };

  // // element별 오브젝트 분할 렌더
  // <group ref={group}>
  //   {meshs.map((child, index) => {
  //     return renderElements(nodes[child]);
  //   })}
  // </group>
  // <group ref={group}>
  //   {meshs.map((name, index) => {
  //     console.log(nodes[name]);
  //     return (
  //       <mesh
  //         key={index}
  //         name={name}
  //         geometry={nodes[name].geometry}
  //         material={nodes[name].material}
  //       />
  //     );
  //   })}
  // </group>
}
