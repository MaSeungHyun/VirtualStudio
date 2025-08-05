import React, { useState, ComponentProps, useEffect, memo, useRef } from "react";
import * as THREE from "three";
import { Context } from "@/core/context";
import { Scene } from "@/core/scene";
import { cn } from "@/utils/style";
import { moveCamera } from "@/utils/camera";
import Toolbar from "@/components/Toolbar";
import SearchBar from "@/components/SearchBar";
import HierarchyIcon from "./_components/HierarchyIcon";
import Icon from "@/components/Icon";
import Panel from "@/components/Panel";

const variants = {
  even: "bg-black-300",
  odd: "bg-black-100",
};

interface HierarchyProps extends ComponentProps<"div"> {
  className?: string;
  scenes: Scene[];
}

export const Hierarchy = memo(() => {
  let count = 0;
  const depth = -1;

  const context = Context.getInstance();

  const hierarchyRef = useRef<HTMLDivElement>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [activeScene, setActiveScene] = useState<Scene>();
  const [select, setSelect] = useState<THREE.Object3D[]>([]);
  const [activeCamera, setActiveCamera] = useState<THREE.Camera>(
    context.scene?.registedCamera as THREE.Camera,
  );

  useEffect(() => {
    const context = Context.getInstance();

    setScenes(context.scenes);
  }, [context.scene]);

  const handleClickSelect = (event: React.MouseEvent<HTMLDivElement>, object: THREE.Object3D) => {
    event.stopPropagation();

    if (!context.scene || object instanceof Scene) {
      return;
    }

    const prevSelect = context.scene.selectedObject;
    if (event.ctrlKey) {
      if (context.scene.selectedObject.includes(object)) {
        context.scene.selectedObject = context.scene.selectedObject.filter((obj) => obj !== object);
      } else {
        context.scene.selectedObject = [...prevSelect, object];
      }
    } else {
      context.scene.selectedObject = [object];
    }
    if (event.detail === 2 && object instanceof THREE.Camera) {
      context.scene.selectedCamera = object;
      context.scene.registedCamera = object;
      context.scene.originalCamera = context.scene.camera.clone();
      setActiveCamera(object);
      moveCamera(object);
    }
  };

  const handleDoubleClickChangeScene = (event: React.MouseEvent<HTMLDivElement>, scene: Scene) => {
    event.stopPropagation();
    if (context.scene !== scene && scene.isScene) {
      context.scene = scene;
      context.camera = scene.camera;
    }
  };

  const contextListener = () => {
    if (!context.scene) {
      return;
    }
    setActiveScene(context.scene);
    setSelect(context.scene.selectedObject);
  };

  const sceneListener = () => {
    if (!context.scene) {
      return;
    }
    setSelect(context.scene.selectedObject);
  };

  // Context 리스너 등록
  useEffect(() => {
    console.log("Regist context event");
    context.subscribe(contextListener);
    return () => {
      context.unsubscribe(contextListener);
    };
  }, []);

  // Scene 리스너 등록
  useEffect(() => {
    console.log("Regist scene event");
    if (context.scene) {
      context.scene?.subscribe(sceneListener);
    }
    setActiveScene(context.scene!);
    setActiveCamera(context.scene?.registedCamera as THREE.Camera);
    return () => {
      if (context.scene) {
        context.scene?.unsubscribe(sceneListener);
      }
    };
  }, [activeScene]);

  return (
    <Panel>
      <div className="bg-black-300 flex h-full max-h-full w-full min-w-full flex-col overflow-hidden rounded-t-lg">
        <Toolbar.Container className="bg-black-500 justify-between px-[0.5rem]">
          <div className="flex items-center gap-1">
            <Icon icon="Network" size={12} />
            <p className="relative mt-0.5 text-xs">Hieararchy</p>
          </div>
          <SearchBar />
        </Toolbar.Container>

        <div ref={hierarchyRef} className="scroll-bar h-full w-full overflow-auto">
          {/* <SceneViewContextMenu> */}
          <div className="flex h-full w-fit min-w-full flex-col">
            {scenes?.map((scene) => {
              count++;
              return (
                <HierarchyItem
                  key={scene.uuid}
                  className={activeScene === scene ? "text-orange-500" : ""}
                  object={scene}
                  count={count}
                  depth={depth}
                  select={select}
                  onClickSelect={activeScene === scene ? handleClickSelect : undefined}
                  active={activeScene === scene}
                  onDoubleClickChangeScene={handleDoubleClickChangeScene}
                  activeCamera={activeCamera}
                >
                  {scene.name}
                </HierarchyItem>
              );
            })}
          </div>
          {/* </SceneViewContextMenu> */}
        </div>
      </div>
    </Panel>
  );
});

// interface HierarchySceneProps extends ComponentProps<"div"> {
//   scene: Scene;
//   children: React.ReactNode;
//   className?: string;
//   count: number;
//   depth: number;
// }

interface HierarchyItemProps extends ComponentProps<"div"> {
  object: Scene | THREE.Object3D;
  children: React.ReactNode;
  className?: string;
  count: number;
  select: THREE.Object3D[];
  depth: number;
  onClickSelect?: (event: React.MouseEvent<HTMLDivElement>, object: THREE.Object3D) => void;
  onDoubleClickChangeScene?: (event: React.MouseEvent<HTMLDivElement>, scene: Scene) => void;
  active: boolean;
  activeCamera: THREE.Camera;
}
const HierarchyItem = ({
  object,
  children,
  className,
  count,
  depth,
  select,
  onClickSelect,
  onDoubleClickChangeScene,
  active,
  activeCamera,
}: HierarchyItemProps) => {
  depth++;

  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(object.visible);

  const handleClickOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleClickVisible = (event: React.MouseEvent<HTMLDivElement>, object: THREE.Object3D) => {
    event.stopPropagation();
    setVisible(!visible);
    object.traverse((child) => {
      child.visible = !visible;
    });
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col text-gray-50",
        count % 2 === 0 ? variants.even : variants.odd,
      )}
    >
      <section
        className={cn(
          "flex min-h-[1.2rem] cursor-pointer items-center gap-1 text-[0.8rem] hover:brightness-125",
          select.includes(object) && "bg-blue-300/25",
        )}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          onClickSelect && onClickSelect(event, object);
        }}
        onDoubleClick={(event: React.MouseEvent<HTMLDivElement>) => {
          onDoubleClickChangeScene && onDoubleClickChangeScene(event, object as Scene);
        }}
      >
        <div className="bg-black-500/80 shadow-black-500 flex h-full min-w-12 items-center justify-center gap-2 border-r-1 border-black shadow-xs">
          <div
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              handleClickVisible(event, object);
            }}
          >
            <Icon
              icon={object.visible ? "Eye" : "EyeOff"}
              size={14}
              className={!object.visible ? "text-gray-500" : "text-gray-50"}
            />
          </div>

          <div
            className={`${open ? "rotate-90" : ""} duration-50`}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              handleClickOpen(event);
            }}
          >
            <Icon icon="Play" className={`w-3 fill-[#d0d0d0]`} size={14} />
          </div>
        </div>

        <section
          className={cn(`relative flex w-full items-center gap-2 text-nowrap`)}
          style={{ marginLeft: `${depth}rem` }}
        >
          <div className="flex items-center justify-center">
            <HierarchyIcon
              icon={object.type}
              className={cn(
                `${select.includes(object) ? "text-orange-400" : "text-orange-500"} p-[0.05rem]`,
                activeCamera === object && "fill-orange-500",
              )}
            />
          </div>
          <div
            className={cn(
              select.includes(object) ? "text-white" : "",
              !active ? "text-gray-500" : "",
              className,
            )}
          >
            {children}
          </div>
        </section>
      </section>

      {open &&
        (object instanceof Scene
          ? object.sceneGraph.map((child) => {
              count++;
              return (
                <HierarchyItem
                  key={child.uuid}
                  object={child}
                  count={count}
                  depth={depth}
                  select={select}
                  onClickSelect={onClickSelect}
                  active={active}
                  activeCamera={activeCamera}
                >
                  {child.name}
                </HierarchyItem>
              );
            })
          : object.sceneGraph?.map((child: THREE.Object3D) => {
              count++;
              return (
                <HierarchyItem
                  key={child.uuid}
                  object={child}
                  count={count}
                  depth={depth}
                  select={select}
                  onClickSelect={onClickSelect}
                  active={active}
                  activeCamera={activeCamera}
                >
                  {child.name}
                </HierarchyItem>
              );
            }))}
    </div>
  );
};

export default Hierarchy;
