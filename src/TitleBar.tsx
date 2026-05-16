import logo from "/public/logo.png";

import { TitleMenu } from "./pages/scene-editor/scene-view/_components/TitleMenu";

export default function TitleBar() {
  return (
    <div
      className="top-0 right-0 left-0 z-50 flex h-8 w-full items-center gap-2 bg-neutral-800 px-2 select-none"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      <img src={logo} alt="logo" className="h-4.5 w-4.5" />

      <div className="flex h-full w-full items-center gap-2">
        <TitleMenu />
      </div>

      {/* 앱 타이틀 */}
      <div className="te absolute left-1/2 flex -translate-x-1/2 items-center gap-2 px-4">
        <span className="text-sm font-medium text-gray-300">New Project</span>
      </div>
    </div>
  );
}
