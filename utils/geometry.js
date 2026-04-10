import * as THREE from "three";

export function normalizeGeometry(geometry) {
  geometry.computeBoundingBox();

  const box = geometry.boundingBox;
  const center = new THREE.Vector3();
  box.getCenter(center);

  geometry.translate(-center.x, -center.y, -center.z);

  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);

  const scale = 2 / maxDim;
  geometry.scale(scale, scale, scale);

  geometry.computeVertexNormals();
}

export function normalizeObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // 🔥 STEP 1: Fix pivot INSIDE meshes
  object.traverse((child) => {
    if (child.isMesh) {
      child.geometry.computeBoundingBox();

      const geoCenter = new THREE.Vector3();
      child.geometry.boundingBox.getCenter(geoCenter);

      // ✅ move geometry to origin (REAL FIX)
      child.geometry.translate(-geoCenter.x, -geoCenter.y, -geoCenter.z);

      child.geometry.computeVertexNormals();
    }
  });

  // 🔥 STEP 2: Reset object transform
  object.position.set(0, 0, 0);
  object.rotation.set(0, 0, 0);

  // 🔥 STEP 3: Scale
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;

  object.scale.set(scale, scale, scale);
}