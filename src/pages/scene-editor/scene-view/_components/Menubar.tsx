import { cn } from "@/utils/style";
import { MenuItem } from "@/constants/menu";
import { memo } from "react";

interface MenubarProps {
  className?: string;
  menu: MenuItem[];
}
export const Menubar = memo(({ className, menu }: MenubarProps) => {
  return (
    <div
      className={cn(
        `bg-black-300 flex min-h-[1.8rem] w-full items-center overflow-hidden rounded-t-lg py-[0.02rem]`,
        className,
      )}
    >
      {menu.map((item) => (
        <MenubarItem key={item.label} item={item} />
      ))}
    </div>
  );
});

interface MenubarItemProps {
  item: MenuItem;
}

export const MenubarItem = memo(({ item }: MenubarItemProps) => {
  return (
    <div className="hover:bg-black-100 flex h-full w-fit items-center rounded-md px-2">
      {item.label}
    </div>
  );
});
