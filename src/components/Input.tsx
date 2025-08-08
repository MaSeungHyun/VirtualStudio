import { cn } from "@/utils/style";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  className?: string;
  label?: string;
};
function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="flex w-full gap-1">
      {label && <label className="text-text-primary text-xs">{label}</label>}
      <input
        className={cn(
          "text-blue-10 h-[1.2rem] w-full bg-black px-2 text-xs caret-blue-300 brightness-125 outline-none focus:border-blue-300",
          props.type === "number" && "text-center",
          (props.disabled || props.readOnly) && "brightness-80",
          className,
        )}
        onChange={(e) => {
          props.onChange?.(e);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.onKeyDown?.(e);
        }}
        {...props}
      />
    </div>
  );
}

export default Input;
