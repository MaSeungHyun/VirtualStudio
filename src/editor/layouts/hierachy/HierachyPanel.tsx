import { FC, useRef } from "react";
import { Scene } from "three";
import styles from "./css/HierachyPanel.module.css";
import { HierachyNode } from "./HierachyNode";

interface HierachyPanelProps {
  scene: Scene | null;
}
export const HierachyPanel: FC<HierachyPanelProps> = ({ scene }) => {
  const depth = useRef(1);
  return (
    <div className={styles.hierachyFrame}>
      <div className={styles.hierachyBox}>
        <div className={styles.nodeBox}>
          <div className={styles.nodeIcon}>
            <div className={styles.indicator} />
          </div>
          <div className={styles.nodeName}>Scene</div>
        </div>

        {scene?.children.map((child, index) => {
          if (child.name !== "grid" && child.name !== "Sky") {
            return (
              <HierachyNode
                key={`${child.uuid}${index}`}
                node={child}
                depth={depth.current}
                index={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
