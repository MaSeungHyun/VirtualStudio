interface Basic {
  id: string;
  name: string;
  class: string;
}

interface Scene extends Basic {
  children: Array<object>;
}
interface Object extends Basic {
  class: "Object" | "Group";
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  children: Array<object>;
}

interface Camera extends Basic {
  class: "Camera";
  type: "Perspective" | "Orthographic";
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

interface Light extends Basic {
  class: "Light";
  type: "Ambient" | "Directional" | "Point";
  intensity: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}
