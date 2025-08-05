import { Context } from "../core/context";
import { createMesh } from "../core/mesh";

export interface MenuItem {
  label: string;
  icon: string;
  subMenu?: MenuItem[];
  callback?: () => void;
  shortcut?: string;
}
export const SCENE_VIEW_HEADER_MENU_ITEMS: MenuItem[] = [
  {
    label: "File",
    icon: "File",
    subMenu: [
      {
        label: "New",
        icon: "File",
        callback: () => {
          // createMesh("box");
        },
      },
    ],
  },
  {
    label: "Edit",
    icon: "Edit",
    subMenu: [],
  },
  {
    label: "Render",
    icon: "Render",
    subMenu: [],
  },
  {
    label: "View",
    icon: "View",
    subMenu: [],
  },
  {
    label: "Window",
    icon: "Window",
    subMenu: [],
  },
  {
    label: "Help",
    icon: "Help",
    subMenu: [],
  },
];

const update = true;

export const SCENE_VIEW_MENU_ITEMS: MenuItem[] = [
  {
    label: "Mesh",
    icon: "Box",
    subMenu: [
      {
        label: "Group",
        icon: "Group",
        callback: () => {
          const mesh = createMesh("Group");
          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "G",
      },
      {
        label: "Plane",
        icon: "Square",
        callback: () => {
          const mesh = createMesh("Plane");

          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "P",
      },
      {
        label: "Box",
        icon: "Box",
        callback: () => {
          const mesh = createMesh("Box");

          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "B",
      },
      {
        label: "Sphere",
        icon: "Sphere",
        callback: () => {
          const mesh = createMesh("Sphere");

          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "S",
      },
      {
        label: "Cylinder",
        icon: "Cylinder",
        callback: () => {
          const mesh = createMesh("Cylinder");

          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "C",
      },
      {
        label: "Cone",
        icon: "Cone",
        callback: () => {
          const mesh = createMesh("Cone");

          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "O",
      },
      {
        label: "Torus",
        icon: "Torus",
        callback: () => {
          const mesh = createMesh("Torus");

          const scene = Context.getInstance().scene;
          scene?.addObject(mesh, update);
          scene!.selectedObject = [mesh];
        },
        shortcut: "T",
      },
    ],
  },
  {
    label: "Camera",
    icon: "Video",
    callback: () => {
      console.log("Camera");
    },
    subMenu: [
      {
        label: "Perspective",
        icon: "Video",
        callback: () => {
          console.log("Perspective");
        },
      },
      {
        label: "Orthographic",
        icon: "Video",
        callback: () => {
          console.log("Orthographic");
        },
      },
    ],
  },
  {
    label: "Light",
    icon: "Flashlight",
    callback: () => {
      console.log("Light");
    },
    subMenu: [
      {
        label: "Directional",
        icon: "Flashlight",
        callback: () => {
          console.log("Directional");
        },
      },
      {
        label: "Point",
        icon: "Flashlight",
        callback: () => {
          console.log("Point");
        },
      },
    ],
  },
  {
    label: "seperate",
    icon: "seperate",
  },
  {
    label: "Copy",
    icon: "Copy",
    callback: () => {
      console.log("Copy");
    },
    shortcut: "⌘+C",
  },
  {
    label: "Paste",
    icon: "Clipboard",
    callback: () => {
      console.log("Paste");
    },
    shortcut: "⌘+V",
  },
];

export const PROGRAM_MENU_ITEMS: MenuItem[] = [
  {
    label: "Layout",
    icon: "Layout",
    subMenu: [],
  },
  {
    label: "Modeling",
    icon: "Modeling",
    subMenu: [],
  },
  {
    label: "Sculpting",
    icon: "Sculpting",
    subMenu: [],
  },
  {
    label: "UV Editing",
    icon: "UV Editing",
    subMenu: [],
  },
  {
    label: "Texture Painting",
    icon: "Texture Painting",
    subMenu: [],
  },
  {
    label: "Shading",
    icon: "Shading",
    subMenu: [],
  },
  {
    label: "Animation",
    icon: "Animation",
    subMenu: [],
  },
  {
    label: "Rendering",
    icon: "Rendering",
    subMenu: [],
  },
  {
    label: "Simulation",
    icon: "Simulation",
    subMenu: [],
  },
];
