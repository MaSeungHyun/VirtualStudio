import Toolbar from "@/components/Toolbar";
import Icon from "@/components/Icon";

export default function Hierarchy() {
  return (
    <main className="bg-black-300 flex h-full max-h-full w-full min-w-full flex-col rounded-t-lg">
      <Toolbar.Container className="h-[1.8rem] justify-between px-[0.5rem]">
        <div className="flex items-center gap-1">
          <Icon icon="Network" size={14} className="mt-[0.05rem]" />
          <p className="relative mt-0.5">Hierarchy</p>
        </div>
      </Toolbar.Container>
    </main>
  );
}
