import React from "react";
import { cn } from "../utils/style";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        `flex h-full w-full overflow-hidden rounded-sm bg-black pt-[0.05rem]`,
        className,
      )}
    >
      <div className="bg-black-300 flex h-full w-full flex-1 flex-col">{children}</div>
    </div>
  );
}

export default Panel;
