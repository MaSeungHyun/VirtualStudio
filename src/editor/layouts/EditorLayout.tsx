import Split from "react-split";
import styles from "./css/EditorLayout.module.css";
import "./css/split.css";
import { TopMenuBar } from "./TopMenuBar";
import { EditorScene } from "./workspace/EditorScene";
import { useRef, useState } from "react";
import { Scene } from "three";
import { HierachyPanel } from "./hierachy/HierachyPanel";
import { TabComponent } from "../../tab/TabComponent";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import TimelineIcon from "@mui/icons-material/Timeline";
import TerminalIcon from "@mui/icons-material/Terminal";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
export interface TabComponentProps {
  tabs: [{ icon: React.FC; name: string; view: React.FC }];
}

export const EditorLayout = () => {
  const [scene, setScene] = useState<Scene | null>(null);

  const LeftBottomTabs: TabComponentProps = [
    {
      icon: (
        <FolderIcon
          sx={{
            fontSize: "0.9rem",
          }}
        />
      ),
      name: "Resource",
      view: <div></div>,
    },
    {
      icon: (
        <TimelineIcon
          sx={{
            fontSize: "0.9rem",
          }}
        />
      ),
      name: "Animation",
      view: <div></div>,
    },
    {
      icon: (
        <TerminalIcon
          sx={{
            fontSize: "0.9rem",
          }}
        />
      ),
      name: "Terminal",
      view: <div></div>,
    },
  ];

  const RightTopTabs: TabComponentProps = [
    {
      icon: (
        <AccountTreeOutlinedIcon
          sx={{
            fontSize: "0.9rem",
          }}
        />
      ),
      name: "Hieraychy",
      view: <HierachyPanel scene={scene} />,
    },
  ];

  const RightBottomTabs: TabComponentProps = [
    {
      icon: (
        <BuildRoundedIcon
          sx={{
            fontSize: "0.85rem",
          }}
        />
      ),
      name: "Component",
      view: <div></div>,
    },
  ];

  return (
    <div className={styles.editor_frame}>
      <TopMenuBar />
      <Split
        className="split"
        sizes={[82, 18]}
        minSize={100}
        expandToMin={false}
        gutterSize={1}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        {/* <div className={styles.top_left}></div> */}
        <Split
          className="split-v"
          sizes={[65, 35]}
          minSize={100}
          expandToMin={false}
          gutterSize={1}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="vertical"
          cursor="row-resize"
        >
          <EditorScene setScene={setScene} />

          {/* <div>Left Bottom</div> */}
          <TabComponent tabs={LeftBottomTabs} />
        </Split>

        <div className={styles.right}>
          <Split
            className="split-v"
            sizes={[30, 70]}
            minSize={100}
            expandToMin={false}
            gutterSize={1}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="vertical"
            cursor="row-resize"
          >
            <div className={styles.right_top}>
              <TabComponent tabs={RightTopTabs} scene={scene} />
              {/* // <HierachyPanel scene={scene} /> */}
            </div>
            <div className={styles.right_bottom}>
              <TabComponent tabs={RightBottomTabs} />
            </div>
          </Split>
        </div>
      </Split>
    </div>
  );
};
