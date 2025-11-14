import { DropdownMenu } from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { useEditor } from "@/hooks/useEditor";
import { cn } from "@/utils/style";
import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";

type ViewportShadingDropdownProps = {
  children: React.ReactNode;
};

const SHADE_TYPE = {
  Solid: "solid",
  Wireframe: "wireframe",
  FlatShading: "flatShading",
  SmoothShading: "smoothShading",
  ShadowOnly: "shadowOnly",
  Depth: "depth",
  Normals: "normals",
} as const;

type ShadeType = (typeof SHADE_TYPE)[keyof typeof SHADE_TYPE];

export default function ViewportShadingDropdown({ children }: ViewportShadingDropdownProps) {
  const { scene } = useEditor();
  const [viewportShading, setViewportShading] = useState<ShadeType>(SHADE_TYPE.Solid);
  const previousMaterialRef = useRef<THREE.Material | null>(null);

  // 컴포넌트 언마운트 시 Material 정리
  useEffect(() => {
    return () => {
      if (previousMaterialRef.current) {
        previousMaterialRef.current.dispose();
        previousMaterialRef.current = null;
      }
    };
  }, []);

  const handleChangeViewportShading = (viewportShading: ShadeType) => {
    if (!scene) return;

    // 이전 Material dispose
    if (previousMaterialRef.current) {
      previousMaterialRef.current.dispose();
      previousMaterialRef.current = null;
    }

    setViewportShading(viewportShading);
    let newMaterial: THREE.Material | null = null;

    switch (viewportShading) {
      case SHADE_TYPE.Solid:
        scene.overrideMaterial = null;
        break;

      case SHADE_TYPE.Wireframe:
        newMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ccff,
          wireframe: true,
        });
        scene.overrideMaterial = newMaterial;
        previousMaterialRef.current = newMaterial;
        break;

      case SHADE_TYPE.FlatShading:
        newMaterial = new THREE.MeshStandardMaterial({
          flatShading: true,
        });
        scene.overrideMaterial = newMaterial;
        previousMaterialRef.current = newMaterial;
        break;

      case SHADE_TYPE.SmoothShading:
        newMaterial = new THREE.MeshStandardMaterial({
          flatShading: false,
        });
        scene.overrideMaterial = newMaterial;
        previousMaterialRef.current = newMaterial;
        break;

      case SHADE_TYPE.ShadowOnly:
        newMaterial = new THREE.ShadowMaterial({
          opacity: 0.5,
        });
        scene.overrideMaterial = newMaterial;
        previousMaterialRef.current = newMaterial;
        break;

      case SHADE_TYPE.Depth:
        newMaterial = new THREE.MeshDepthMaterial();
        scene.overrideMaterial = newMaterial;
        previousMaterialRef.current = newMaterial;
        break;

      case SHADE_TYPE.Normals:
        newMaterial = new THREE.MeshNormalMaterial();
        scene.overrideMaterial = newMaterial;
        previousMaterialRef.current = newMaterial;
        break;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup
          value={viewportShading}
          onValueChange={(value) => handleChangeViewportShading(value as ShadeType)}
        >
          {Object.values(SHADE_TYPE).map((type) => (
            <DropdownMenu.RadioItem key={type} value={type}>
              <DropdownMenu.ItemIndicator>
                <Icon
                  icon="Check"
                  size={14}
                  className={`stroke-3 ${viewportShading === type ? "text-gc-cyan-100" : "text-transparent"}`}
                />
              </DropdownMenu.ItemIndicator>
              <Icon icon="Eclipse" size={15} className={cn("mr-1.5")} />{" "}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
