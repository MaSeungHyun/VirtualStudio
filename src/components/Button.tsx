import { cn } from "@/utils/style";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  toggle?: boolean;
}
export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-black-700 w-full cursor-pointer rounded-xs border-1 border-gray-600 shadow-md hover:bg-blue-400/30",
        className,
      )}
      // className={cn(
      //   `border-background-db-primary bg-border-primary flex h-[1.5rem] w-full cursor-pointer items-center justify-center rounded-[3px] border-[1.5px] p-[1px] text-xs shadow-sm hover:brightness-110`,
      //   toggle
      //     ? "from-progress-start to-background-db-select bg-gradient-to-t"
      //     : "from-background-db-secondary/10 to-background-db-third bg-gradient-to-t",
      //   className,
      // )}
      onClick={props.onClick}
      {...props}
    ></button>
  );
}
