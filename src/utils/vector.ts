import * as THREE from "three";

export const random = (range: number) => {
  return new THREE.Vector3(Math.random() * range, Math.random() * range, Math.random() * range);
};

export const Vector = {
  random: random,
};
