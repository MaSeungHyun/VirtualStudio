import React from "react";
import { cn } from "../utils/style";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

function Panel({ children, className }: PanelProps) {
  return (
    <div className={cn(`h-full w-full bg-black px-[0.02rem] pt-[0.1rem]`, className)}>
      {children}
    </div>
  );
}

export default Panel;
