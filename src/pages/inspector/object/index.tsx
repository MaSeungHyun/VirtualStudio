import * as THREE from "three";
import Accordian from "../_components/Accordian";
import Content from "../_components/Content";
import Input from "@/components/Input";

type ObjectInspectorProps = {
  selected: THREE.Object3D;
};
export default function ObjectInspector({ selected }: ObjectInspectorProps) {
  return (
    <section className="w-full">
      <Accordian title="Object">
        <Content title="UUID">
          <Input className="w-full" defaultValue={selected?.uuid} readOnly />
        </Content>
        <Content title="Name">
          <Input className="w-full" value={selected?.name} onChange={() => {}} />
        </Content>
        <Content title="Type">
          <Input className="w-full" defaultValue={selected?.type} readOnly />
        </Content>
      </Accordian>
    </section>
  );
}
