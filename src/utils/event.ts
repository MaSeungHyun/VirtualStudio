import * as THREE from "three";

export const getVector3FromEvent = (
  event: MouseEvent
): THREE.Vector3 | undefined => {
  if (event.currentTarget) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    return new THREE.Vector3(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
      0
    );
  }
};
