import Split from "@/components/Split";
import { SceneView } from "./scene-view";
import { Animation } from "../animation";
import Hierarchy from "../hierarchy";
import { Inspector } from "../inspector";

import { useSplitStore } from "@/store/useSplitStore";

export default function SceneEditor() {
  const { size } = useSplitStore();

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-black">
      <Split size={[80, 20]} direction="horizontal">
        <Split minSize={40} expandToMin={false} size={size} direction="vertical">
          <SceneView />
          <Animation />
        </Split>
        <Split size={[35, 65]} direction="vertical">
          <Hierarchy />
          <Inspector />
        </Split>
      </Split>
    </div>
  );
}
