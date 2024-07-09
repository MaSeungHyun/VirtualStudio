import React, { FC, useState } from "react";
import styles from "./css/TabComponent.module.css";
// NOTE
// 제목(name)
// 화면(view)

interface TabComponentProps {
  tabs: TabComponentProps;
}

export const TabComponent: FC<TabComponentProps> = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabIndex = (index: number) => {
    setTabIndex(index);
  };
  return (
    <div className={styles.tabFrame}>
      <div className={styles.tabArea}>
        {tabs?.map((tab: string, index: number) => {
          return (
            <div
              key={`tab_${tab.name}`}
              className={tabIndex === index ? styles.selectedTab : styles.tab}
              onClick={() => {
                handleTabIndex(index);
              }}
            >
              <div className={styles.tabIcon}>{tab.icon}</div>

              <div className={styles.tabName}>{tab.name}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.tabDesc}>{tabs[tabIndex].view}</div>
    </div>
  );
};
