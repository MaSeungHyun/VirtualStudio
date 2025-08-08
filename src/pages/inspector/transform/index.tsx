import Input from "@/components/Input";
import React from "react";
import Content from "../_components/Content";
import Accordian from "../_components/Accordian";
import * as THREE from "three";

type TransformInspectorProps = {
  selected: THREE.Object3D;
};
export default function TransformInspector({ selected }: TransformInspectorProps) {
  return (
    <section className="w-full">
      <Accordian title="Transform">
        <Content title="Position">
          <div className="flex gap-1">
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldPosition(new THREE.Vector3()).x.toFixed(3)}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldPosition(new THREE.Vector3()).y.toFixed(3)}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldPosition(new THREE.Vector3()).z.toFixed(3)}
            />
          </div>
        </Content>
        <Content title="Rotation">
          <div className="flex gap-1">
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).x}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).y}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).z}
            />
          </div>
        </Content>
        <Content title="Quaternion">
          <div className="flex gap-1">
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).x}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).y}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).z}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldQuaternion(new THREE.Quaternion()).w}
            />
          </div>
        </Content>
        <Content title="Scale">
          <div className="flex gap-1">
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldScale(new THREE.Vector3()).x}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldScale(new THREE.Vector3()).y}
            />
            <Input
              type="number"
              className="w-full"
              value={selected?.getWorldScale(new THREE.Vector3()).z}
            />
          </div>
        </Content>
      </Accordian>
    </section>
  );
}
