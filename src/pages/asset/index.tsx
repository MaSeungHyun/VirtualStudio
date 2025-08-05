import Toolbar from "@/components/Toolbar";
import Icon from "@/components/Icon";

export default function Asset() {
  return (
    <main className="bg-black-300 flex h-full max-h-full w-full min-w-full flex-col rounded-t-lg">
      <Toolbar.Container className="justify-between px-[0.5rem]">
        <div className="flex items-center gap-1">
          <Icon icon="Folder" size={14} />
          <p>Asset</p>
        </div>
      </Toolbar.Container>
    </main>
  );
}
