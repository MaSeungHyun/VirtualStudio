import Toolbar from "@/components/Toolbar";
import Icon from "@/components/Icon";
import Panel from "@/components/Panel";
import { memo, useCallback, useEffect, useState } from "react";
import ObjectInspector from "./object";
import { Context } from "@/core/context";
import TransformInspector from "./transform";
import * as THREE from "three";
import Button from "@/components/Button";
import { Scene } from "@/core/scene";
import { DropdownMenu } from "@/components/Dropdown";
import AddComponentDropDown from "./_components/AddComponentDropDown";

export const Inspector = memo(() => {
  const context = Context.getInstance();
  const [selected, setSelected] = useState<THREE.Object3D | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);

  const getSelected = useCallback(() => {
    setSelected(context.scene?.selectedObject[0] ?? null);
    setScene(context.scene);
  }, [scene]);

  useEffect(() => {
    context.scene?.subscribe(getSelected);

    return () => {
      context.scene?.unsubscribe(getSelected);
    };
  }, [scene]);

  return (
    <Panel>
      <section className="flex h-full max-h-full w-full min-w-full flex-col items-center rounded-t-lg">
        <Toolbar.Container className="justify-between px-[0.5rem]">
          <div className="flex items-center gap-1">
            <Icon icon="Hammer" size={14} />
            <p className="text-xs">Inspector</p>
          </div>
        </Toolbar.Container>
        {selected ? (
          <>
            <ObjectInspector selected={selected} />
            <TransformInspector selected={selected} />

            <AddComponentDropDown>
              <Button className="shadow-black-600 mt-3 h-[1.8rem] w-6/12">Add Component</Button>
            </AddComponentDropDown>
          </>
        ) : (
          <p className="mt-2 w-full px-2 text-center">
            디테일 확인을 위하여 오브젝트를 선택해주세요.
          </p>
        )}
      </section>
    </Panel>
  );
});
