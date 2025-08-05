import { useEffect, useLayoutEffect, useRef } from "react";
import { Context } from "@/core/context";
import { cn } from "@/utils/style";
import SceneViewToolbar from "./_components/SceneViewToolbar";
import { Menubar } from "./_components/Menubar";
import { SCENE_VIEW_HEADER_MENU_ITEMS } from "@/constants/menu";

export default function SceneView({ className }: { className?: string }) {
  const sceneViewRef = useRef<HTMLDivElement>(null);

  const context = Context.getInstance();

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
    <div className="flex h-full flex-1 flex-col">
      <Menubar menu={SCENE_VIEW_HEADER_MENU_ITEMS} className="bg-black-500" />
      <SceneViewToolbar />
      <section className="relative h-full">
        <div
          ref={sceneViewRef}
          className={cn(
            "from-black-500 to-black-100 relative h-full w-full overflow-hidden rounded-b-lg bg-gradient-to-b",
            "bg-[#404040]",
            // "bg-radial-[at_50%_75%] from-black-200  to-black-500 to-90%",
            className,
          )}
        />
      </section>
    </div>
  );
}
