import Toolbar from "@/components/Toolbar";
import Icon from "@/components/Icon";

export default function Inspector() {
  return (
    <main className="bg-black-300 flex h-full max-h-full w-full min-w-full flex-col rounded-t-lg">
      <Toolbar.Container className="h-[1.8rem] justify-between px-[0.5rem]">
        <div className="flex items-center gap-1">
          <Icon icon="Hammer" size={14} />
          <p>Inspector</p>
        </div>
      </Toolbar.Container>
    </main>
  );
}
