import { DropdownMenu } from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { useEditor } from "@/hooks/useEditor";
import React, { useState } from "react";
import * as THREE from "three";

type ViewportShadingDropdownProps = {
  children: React.ReactNode;
};

const iconStyle = "mr-2";

export default function ViewportShadingDropdown({ children }: ViewportShadingDropdownProps) {
  const { scene } = useEditor();
  const [viewportShading, setViewportShading] = useState<string>("realistic");

  const handleChangeViewportShading = (viewportShading: string) => {
    console.log(scene);
    if (!scene) return;

    setViewportShading(viewportShading);
    switch (viewportShading) {
      case "realistic":
        // pathtracer.init(scene, context.viewportCamera);
        break;

      case "solid":
        scene.overrideMaterial = null;
        break;

      case "normals":
        scene.overrideMaterial = new THREE.MeshNormalMaterial();
        break;

      case "wireframe":
        scene.overrideMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ccff,
          wireframe: true,
        });
        break;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup value={viewportShading} onValueChange={setViewportShading}>
          {/* <DropdownMenu.RadioItem value="realistic">
            <DropdownMenu.ItemIndicator>
              <Icon icon="Check" />
            </DropdownMenu.ItemIndicator>
            <Icon
              icon="Flat"
              className={iconStyle}
              onClick={() => handleChangeViewportShading("realistic")}
            />{" "}
            Realistic
          </DropdownMenu.RadioItem> */}
          <DropdownMenu.RadioItem
            value="solid"
            onClick={() => handleChangeViewportShading("solid")}
          >
            <DropdownMenu.ItemIndicator>
              <Icon icon="Check" />
            </DropdownMenu.ItemIndicator>
            <Icon icon="Flat" className={iconStyle} /> Solid
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem
            value="normals"
            onClick={() => handleChangeViewportShading("normals")}
          >
            <DropdownMenu.ItemIndicator>
              <Icon icon="Check" />
            </DropdownMenu.ItemIndicator>
            <Icon icon="Flat" className={iconStyle} /> Normals
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem
            value="wireframe"
            onClick={() => handleChangeViewportShading("wireframe")}
          >
            <DropdownMenu.ItemIndicator>
              <Icon icon="Check" />
            </DropdownMenu.ItemIndicator>
            <Icon icon="Flat" className={iconStyle} /> Shaded
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
