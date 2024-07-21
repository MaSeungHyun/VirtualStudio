import { FC, useRef, useState } from "react";
import { Scene } from "three";
import styles from "./css/HierachyPanel.module.css";
import { HierachyNode } from "./HierachyNode";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Visibility } from "@mui/icons-material";

interface HierachyPanelProps {
  scene: Scene | null;
}
export const HierachyPanel: FC<HierachyPanelProps> = ({ scene }) => {
  const [open, setOpen] = useState(true);
  const depth = useRef(1);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.hierachyFrame}>
      <div className={styles.hierachyBox}>
        <div className={styles.nodeCollection}>
          <div className={styles.node}>
            <div className={styles.nodeForward}>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  width: "24px",
                  fontSize: "12px",
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                }}
                onClick={handleOpen}
              />
              <div className={styles.indicator} />
            </div>
            <div className={styles.nodeName}>Scene dasdsdfsddsfdsdsfs</div>
          </div>
          {open &&
            scene?.children.map((child, index) => {
              if (child.name !== "grid" && child.name !== "Sky") {
                return (
                  <HierachyNode
                    key={`${child.uuid}${index}`}
                    node={child}
                    depth={depth.current}
                    index={index + 1}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

// <FontAwesomeIcon
//   icon={faChevronRight}
//   style={{
//     width: "24px",
//     fontSize: "12px",
//     transform: open ? "rotate(90deg)" : "rotate(0deg)",
//   }}
//   onClick={handleOpen}
// />;

// {
//   open &&
//     scene?.children.map((child, index) => {
//       if (child.name !== "grid" && child.name !== "Sky") {
//         return (
//           <HierachyNode
//             key={`${child.uuid}${index}`}
//             node={child}
//             depth={depth.current}
//             index={index + 1}
//           />
//         );
//       }
//     });
// }
