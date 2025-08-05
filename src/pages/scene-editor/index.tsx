import Split from "@/components/Split";
import Panel from "@/components/Panel";
import SceneView from "./scene-view";
import Asset from "../asset";
import Hierarchy from "../hierarchy";
import Inspector from "../inspector";

export default function SceneEditor() {
  return (
    <div className="flex h-full max-h-screen w-full max-w-full flex-col bg-black">
      <Split size={[80, 20]} direction="horizontal">
        <Split size={[100, 0]} direction="vertical">
          <Panel>
            <SceneView />
          </Panel>
          <Panel>
            <Asset />
          </Panel>
        </Split>
        <Split size={[35, 65]} direction="vertical">
          <Panel>
            <Hierarchy />
          </Panel>
          <Panel className="pt-0">
            <Inspector />
          </Panel>
        </Split>
      </Split>
    </div>
  );
}
