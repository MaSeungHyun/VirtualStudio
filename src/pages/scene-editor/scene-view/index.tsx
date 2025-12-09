import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { useEditor } from "@/hooks/useEditor";
import { cn } from "@/utils/style";
import SceneViewToolbar from "./_components/SceneViewToolbar";

import Panel from "@/components/Panel";
import Button from "@/components/Button";

export const SceneView = memo(({ className }: { className?: string }) => {
  const sceneViewRef = useRef<HTMLDivElement>(null);

  const context = useEditor();

  useEffect(() => {
    if (sceneViewRef.current) {
      console.time("SceneView Render");
      context.didMount(sceneViewRef.current);
      console.timeEnd("SceneView Render");
    }

    return () => {
      console.log("%cUnMount", "color: red");
      context.dispose();
    };
  }, []);

  return (
    <Panel>
      <div className="flex h-full min-h-0 flex-col">
        <SceneViewToolbar />
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <div
            ref={sceneViewRef}
            className={cn(
              "from-black-500 to-black-100 h-full w-full flex-1 rounded-b-lg bg-gradient-to-b",
              "bg-[#404040]",
              className,
            )}
          />
        </div>
      </div>
    </Panel>
  );
});
