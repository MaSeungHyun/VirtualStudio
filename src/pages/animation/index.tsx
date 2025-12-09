import Toolbar from "@/components/Toolbar";
import Icon from "@/components/Icon";
import { memo } from "react";
import Panel from "@/components/Panel";

export const Animation = memo(() => {
  return (
    <Panel>
      <section className="bg-black-300 flex h-full max-h-full w-full min-w-full flex-col rounded-t-lg">
        <Toolbar.Container className="justify-between px-[0.5rem]">
          <div className="hover:bg-black-50 flex cursor-pointer items-center gap-1 rounded-sm px-1">
            <Icon icon="Running" size={14} />
            <p>Animation</p>
          </div>
        </Toolbar.Container>
      </section>
    </Panel>
  );
});
