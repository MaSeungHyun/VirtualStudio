import { Camera, Group, Light, Mesh } from "three";
import styles from "./css/HierachyNode.module.css";
import { FC, MutableRefObject } from "react";

interface HierachyNodeProps {
  node: Mesh | Group | Light | Camera;
  depth: MutableRefObject<number>;
  index: number;
}

export const HierachyNode: FC<HierachyNodeProps> = ({ node, depth, index }) => {
  return (
    <>
      <div className={index % 2 === 1 ? styles.oddNode : styles.evenNode}>
        <div className={styles.nodeIcon} style={{ marginLeft: `${depth}rem` }}>
          <div className={styles.indicator} />
        </div>

        <div className={styles.nodeName}>{node.name}</div>
      </div>
      {node.children &&
        node.children.map((child, idx) => {
          return (
            <HierachyNode
              key={`${child.uuid}${idx}`}
              node={child}
              depth={depth + 1.2}
              index={idx + 1}
            />
          );
        })}
    </>
  );
};
