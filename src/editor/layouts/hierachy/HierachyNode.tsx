import { Camera, Group, Light, Mesh, Object3D } from "three";
import styles from "./css/HierachyNode.module.css";
import { FC, MutableRefObject, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface HierachyNodeProps {
  node: Object3D | Mesh | Group | Light | Camera;
  depth: number;
  index: number;
}

export const HierachyNode: FC<HierachyNodeProps> = ({ node, depth, index }) => {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={index % 2 === 1 ? styles.oddNode : styles.evenNode}>
        <div className={styles.node} style={{ paddingLeft: `${depth}rem` }}>
          <div className={styles.nodeForward}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{
                width: "24px",
                fontSize: "12px",
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                visibility: node.children.length > 0 ? "visible" : "hidden",
              }}
              onClick={handleOpen}
            />
            <div className={styles.indicator} />
          </div>
          <div className={styles.nodeName}>{node.name}</div>
        </div>
      </div>
      {open &&
        node.children &&
        node.children.map((child, idx) => {
          return (
            <HierachyNode
              key={`${child.uuid}${idx}`}
              node={child}
              depth={depth + 1}
              index={
                open
                  ? child.children.length % 2 === 1
                    ? depth + 1
                    : depth + 1
                  : child.children.length % 2 === 0 &&
                    child.children.length === 0
                  ? depth + 1
                  : depth - 1
              }
            />
          );
        })}
    </>
  );
};
