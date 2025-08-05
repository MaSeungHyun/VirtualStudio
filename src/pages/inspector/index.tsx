import Toolbar from "@/components/Toolbar";
import Icon from "@/components/Icon";
import Panel from "@/components/Panel";
import { memo } from "react";

export const Inspector = memo(() => {
  return (
    <Panel>
      <section className="bg-black-300 flex h-full max-h-full w-full min-w-full flex-col rounded-t-lg">
        <Toolbar.Container className="justify-between px-[0.5rem]">
          <div className="flex items-center gap-1">
            <Icon icon="Hammer" size={14} />
            <p className="text-xs">Inspector</p>
          </div>
        </Toolbar.Container>
      </section>
    </Panel>
  );
});
