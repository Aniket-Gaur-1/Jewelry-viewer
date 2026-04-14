import * as THREE from "three";

export function normalizeGeometry(geometry) {
  if (!geometry) return; // Safety check
  
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  
  // If the box is null (empty mesh), stop processing
  if (!box) return;

  const center = new THREE.Vector3();
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);

  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / (maxDim || 1); // Avoid division by zero
  geometry.scale(scale, scale, scale);
  geometry.computeVertexNormals();
}

export function normalizeObject(object) {
  if (!object) return;

  object.traverse((child) => {
    // Only process if it's a mesh AND has valid geometry
    if (child.isMesh && child.geometry) {
      child.geometry.computeBoundingBox();
      
      // Ensure the bounding box exists before trying to center it
      if (child.geometry.boundingBox) {
        const geoCenter = new THREE.Vector3();
        child.geometry.boundingBox.getCenter(geoCenter);
        child.geometry.translate(-geoCenter.x, -geoCenter.y, -geoCenter.z);
        child.geometry.computeVertexNormals();
      }
    }
  });

  // Center the whole ring group
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return; // Stop if the whole object is empty

  const center = new THREE.Vector3();
  box.getCenter(center);
  object.position.x -= center.x;
  object.position.y -= center.y;
  object.position.z -= center.z;

  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / (maxDim || 1);
  object.scale.set(scale, scale, scale);
}