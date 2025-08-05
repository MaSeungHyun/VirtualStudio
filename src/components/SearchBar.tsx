import { ComponentProps } from "react";
import { cn } from "../utils/style";
import Icon from "./Icon";

type SearchBarProps = ComponentProps<"input"> & {
  className?: string;
};
export default function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <section
      className={cn("flex items-center gap-1 rounded-xs border-1 border-gray-600 px-1", className)}
      {...props}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <Icon icon="Search" size={14} />
      <input className="h-full w-full rounded-xs pr-1 text-gray-50 outline-none"></input>
    </section>
  );
}
