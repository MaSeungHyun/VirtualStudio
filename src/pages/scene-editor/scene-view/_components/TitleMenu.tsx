import { MenuItem, EDITOR_MENU_ITEMS } from "@/constants/menu";

import Icon from "@/components/Icon";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/Menubar";

function renderMenuItems(items: MenuItem[], parentKey = "") {
  return items.map((item) => {
    const key = `${parentKey}/${item.label}`;

    if (item.label === "seperate") {
      return <MenubarSeparator key={`${key}-separator`} />;
    }

    if (item.subMenu && item.subMenu.length > 0) {
      return (
        <MenubarSub key={key}>
          <MenubarSubTrigger onSelect={item.callback}>
            {item.icon && <Icon icon={item.icon} className="size-4" />}
            {item.label}
          </MenubarSubTrigger>
          <MenubarSubContent>{renderMenuItems(item.subMenu, key)}</MenubarSubContent>
        </MenubarSub>
      );
    }

    return (
      <MenubarItem key={key} onSelect={item.callback}>
        {item.icon && <Icon icon={item.icon} className="size-4" />}
        {item.label}
        {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
      </MenubarItem>
    );
  });
}

export const TitleMenu = () => {
  return (
    <Menubar style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
      {EDITOR_MENU_ITEMS.map((menu) => (
        <MenubarMenu key={menu.label}>
          <MenubarTrigger>{menu.label}</MenubarTrigger>
          <MenubarContent>
            {menu.subMenu && menu.subMenu.length > 0 ? (
              <MenubarGroup>{renderMenuItems(menu.subMenu)}</MenubarGroup>
            ) : null}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};
