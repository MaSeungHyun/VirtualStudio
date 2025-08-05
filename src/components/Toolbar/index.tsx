import React, { ComponentProps } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/style";

type ToolMenuProps = {
  className?: string;
  children: React.ReactNode;
};

function ToolbarContainer({ className, children }: ToolMenuProps) {
  return (
    <div
      className={cn(
        "bg-black-500 text-text-primary relative flex h-[1.8rem] w-full items-center rounded-t-md border-b-2 border-black px-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ToolbarGroup({ className, children }: ToolMenuProps) {
  return <div className={cn("flex items-center gap-[0.1rem]", className)}>{children}</div>;
}

const toolMenuVariants = cva(
  "bg-black-200 hover:bg-blue-300/80 cursor-pointer items-center justify-center flex text-gray-50 p-1 border-1 border-black-500 ",
  {
    variants: {
      shape: {
        rect: "rounded-sm",
        round: "rounded-full",
      },
      size: {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7",
      },
    },
    defaultVariants: {
      shape: "rect",
      size: "md",
    },
  },
);

type ToolbarItemProps = ComponentProps<"div"> & {
  shape: "rect" | "round";
  size: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  selected?: boolean;
};

function ToolbarItem({ shape, size, className, children, selected, ...props }: ToolbarItemProps) {
  return (
    <div
      className={cn(
        toolMenuVariants({
          shape: shape,
          size: size,
        }),
        selected && "border-1 border-blue-300 bg-blue-500 text-white",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const Toolbar = {
  Container: ToolbarContainer,
  Group: ToolbarGroup,
  Item: ToolbarItem,
};

export default Toolbar;
