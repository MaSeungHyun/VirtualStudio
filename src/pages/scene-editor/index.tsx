import Split from "@/components/Split";
import { SceneView } from "./scene-view";
import { Asset } from "../asset";
import Hierarchy from "../hierarchy";
import { Inspector } from "../inspector";

import { Menubar } from "./scene-view/_components/Menubar";
import { SCENE_VIEW_HEADER_MENU_ITEMS } from "@/constants/menu";
import SceneEditorDialog from "./_components/SceneEditorDialog";
import { useSplitStore } from "@/store/useSplit";

export default function SceneEditor() {
  const { size } = useSplitStore();

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black">
      <SceneEditorDialog />
      <Menubar menu={SCENE_VIEW_HEADER_MENU_ITEMS} className="bg-black-500" />
      <Split size={[80, 20]} direction="horizontal">
        <Split minSize={28} expandToMin={false} size={size} direction="vertical">
          <SceneView />
          <Asset />
        </Split>
        <Split size={[35, 65]} direction="vertical">
          <Hierarchy />
          <Inspector />
        </Split>
      </Split>
    </div>
  );
}
