import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils/style";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
}

export default function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-[1.5rem] w-full overflow-hidden rounded-xs bg-black/70 outline-1 outline-black",
        className,
      )}
      {...props}
      style={{
        transform: "translateZ(0)",
      }}
      value={value}
    >
      <div className="text-text-primary absolute top-0 left-[50%] z-9999 flex h-full -translate-x-1/2 items-center text-sm font-medium">
        {value}%
      </div>
      <ProgressPrimitive.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-blue-400 transition-transform"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
