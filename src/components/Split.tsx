import React, { ComponentProps, useRef } from "react";
import SplitComponent from "react-split";
import { cn } from "../utils/style";

type SplitProps = ComponentProps<typeof SplitComponent> & {
  size?: [number, number];
  direction?: "horizontal" | "vertical";
  children?: React.ReactNode;
};

export default function Split({
  direction = "vertical",
  size = [50, 50],
  children,
  ...props
}: SplitProps) {
  const splitRef = useRef<SplitComponent>(null);
  return (
    <SplitComponent
      ref={splitRef}
      gutterSize={0.5}
      className={cn(
        "relative flex h-full w-full",
        direction === "vertical" ? "flex-col gap-[0.075rem]" : "flex-row gap-[0.075rem]",
      )}
      direction={direction}
      gutterAlign="center"
      sizes={size}
      {...props}
    >
      {children}
    </SplitComponent>
  );
}
