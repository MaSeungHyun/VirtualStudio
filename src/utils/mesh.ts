import * as THREE from "three";
import { MeshType } from "../types/mesh";

declare module "three" {
  interface Object3D {
    graph: THREE.Object3D[];
  }
  interface Mesh {
    graph: THREE.Object3D[];
  }
}

export const createMesh = (type: MeshType): THREE.Mesh | THREE.Group => {
  let mesh: THREE.Mesh | THREE.Group;
  if (type === "Group") {
    mesh = new THREE.Group();
    mesh.name = `New Group`;
    mesh["graph"] = [];

    return mesh;
  } else {
    mesh = new THREE.Mesh();
    mesh["graph"] = [];

    const geometry = createGeometry(type);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      side: THREE.DoubleSide,
    });
    mesh.geometry = geometry;
    mesh.material = material;
    mesh.position.set(0, 0, 0);

    mesh.name = `New ${type}`;

    return mesh;
  }
};

const createGeometry = (type: MeshType): THREE.BufferGeometry => {
  switch (type) {
    case "Box":
      return new THREE.BoxGeometry(1, 1, 1);
    case "Plane":
      return new THREE.PlaneGeometry(1, 1);
    case "Sphere":
      return new THREE.SphereGeometry(1, 32, 16);
    case "Cylinder":
      return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    case "Cone":
      return new THREE.ConeGeometry(0.5, 1, 32);
    case "Torus":
      return new THREE.TorusGeometry(0.5, 0.2, 16, 64);
    default:
      return new THREE.BoxGeometry(1, 1, 1);
  }
};
