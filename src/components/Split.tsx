import React from "react";
import SplitComponent from "react-split";
import { cn } from "../utils/style";

type SplitProps = {
  size?: [number, number];
  direction?: "horizontal" | "vertical";
  children?: React.ReactNode;
};

export default function Split({
  direction = "vertical",
  size = [50, 50],
  children,
}: SplitProps) {
  return (
    <SplitComponent
      gutterSize={1}
      className={cn(
        "flex w-full h-full relative",
        direction === "vertical"
          ? "flex-col gap-[0.075rem]"
          : "flex-row gap-[0.075rem]"
      )}
      direction={direction}
      minSize={31}
      sizes={size}
    >
      {children}
    </SplitComponent>
  );
}
