import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/utils/style";

import { forwardRef } from "react";
import Icon from "./Icon";

const DropdownMenuRoot = DropdownPrimitive.Root;

const DropdownMenuPortal = DropdownPrimitive.Portal;

const DropdownMenuSub = DropdownPrimitive.Sub;

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownPrimitive.Content
      ref={ref}
      className={cn(
        "bg-gc-black-600 border-gc-gray-800 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-2 min-w-[220px] rounded-md border-1 p-[5px] px-3 text-[#cecece] shadow-lg shadow-black/50 will-change-[opacity,transform]",
        className,
      )}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = DropdownPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Item
    ref={ref}
    className={cn(
      "group text-violet11 data-[highlighted]:bg-gc-blue-400/30 data-[disabled]:text-mauve8 data-[disabled]:text-gc-gray-500 relative flex h-[25px] items-center rounded-[3px] pr-[5px] pl-[25px] text-[13px] leading-none outline-none select-none hover:bg-blue-400/30 hover:text-white data-[disabled]:pointer-events-none data-[highlighted]:text-white",
      className,
    )}
    {...props}
  />
));

const DropdownMenuShortcut = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white",
      className,
    )}
    {...props}
  />
));
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const DropdownMenuTrigger = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownPrimitive.Trigger
    ref={ref}
    className={cn(
      "group text-violet11 data-[highlighted]:bg-violet9 data-[highlighted]:data-[state=open]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[disabled]:text-gc-gray-500 relative flex h-[25px] items-center rounded-[3px] pr-[5px] pl-[25px] text-[13px] leading-none outline-none select-none hover:bg-blue-400/30 data-[disabled]:pointer-events-none data-[highlighted]:text-white data-[state=open]:bg-blue-400/30 data-[state=open]:text-white data-[highlighted]:data-[state=open]:text-white",
      className,
    )}
    {...props}
  >
    {children}
    <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white">
      <Icon icon="ChevronRight" />
    </div>
  </DropdownPrimitive.Trigger>
));
DropdownMenuTrigger.displayName = DropdownPrimitive.Trigger.displayName;

const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "group text-violet11 data-[highlighted]:bg-violet9 data-[highlighted]:data-[state=open]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[disabled]:text-gc-gray-500 relative flex h-[25px] items-center rounded-[3px] pr-[5px] pl-[25px] text-[13px] leading-none outline-none select-none hover:bg-blue-400/30 data-[disabled]:pointer-events-none data-[highlighted]:text-white data-[state=open]:bg-blue-400/30 data-[state=open]:text-white data-[highlighted]:data-[state=open]:text-white",
      className,
    )}
    {...props}
  >
    {children}
    <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white">
      <Icon icon="ChevronRight" />
    </div>
  </DropdownPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownPrimitive.SubContent
      ref={ref}
      className={cn(
        "bg-gc-black-600 border-gc-gray-800 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade min-w-[220px] rounded-md border-1 p-[5px] px-3 text-[#cecece] shadow-lg shadow-black/50 will-change-[opacity,transform]",
        className,
      )}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuSubContent.displayName = DropdownPrimitive.SubContent.displayName;

const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Separator
    ref={ref}
    className={cn("bg-gc-gray-300 m-[5px] h-px", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownPrimitive.Separator.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.CheckboxItem>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "group text-violet11 data-[highlighted]:bg-gc-blue-400/30 data-[disabled]:text-mauve8 data-[disabled]:text-gc-gray-500 relative flex h-[25px] items-center rounded-[3px] pr-[5px] pl-[25px] text-[13px] leading-none outline-none select-none hover:bg-blue-400/30 hover:text-white data-[disabled]:pointer-events-none data-[highlighted]:text-white",
      className,
    )}
    {...props}
  />
));
DropdownMenuCheckboxItem.displayName = DropdownPrimitive.CheckboxItem.displayName;

const DropdownMenuItemIndicator = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.ItemIndicator
    ref={ref}
    className={cn("absolute left-0 inline-flex w-[25px] items-center justify-center", className)}
    {...props}
  />
));
DropdownMenuItemIndicator.displayName = DropdownPrimitive.ItemIndicator.displayName;

const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Label
    ref={ref}
    className={cn("text-mauve11 rounded-xs pl-[24px] text-xs leading-[25px] text-white", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownPrimitive.Label.displayName;

const DropdownMenuRadioGroup = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.RadioGroup>
>(({ ...props }, ref) => <DropdownPrimitive.RadioGroup ref={ref} {...props} />);
DropdownMenuRadioGroup.displayName = DropdownPrimitive.RadioGroup.displayName;

const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.RadioItem>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.RadioItem
    ref={ref}
    className={cn(
      "text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 relative flex h-[25px] items-center rounded-[3px] pr-[5px] pl-[25px] text-[13px] leading-none outline-none select-none hover:bg-blue-400/30 hover:text-white data-[disabled]:pointer-events-none data-[highlighted]:text-white",
      className,
    )}
    {...props}
  />
));
DropdownMenuRadioGroup.displayName = DropdownPrimitive.RadioItem.displayName;

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Item: DropdownMenuItem,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Separator: DropdownMenuSeparator,
  CheckboxItem: DropdownMenuCheckboxItem,
  ItemIndicator: DropdownMenuItemIndicator,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Shortcut: DropdownMenuShortcut,
};
