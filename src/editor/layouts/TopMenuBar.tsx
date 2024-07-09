import { useState } from "react";
import styles from "./css/TopMenuBar.module.css";
export const TopMenuBar = () => {
  const [menus, setMenus] = useState<Array<string>>([
    "File",
    "Edit",
    "Add",
    "View",
    "Window",
  ]);
  return (
    <div className={styles.menubarFrame}>
      {menus.map((menu) => {
        return (
          <div key={`topMenu_${menu}`} className={styles.menu}>
            {menu}
          </div>
        );
      })}
    </div>
  );
};
