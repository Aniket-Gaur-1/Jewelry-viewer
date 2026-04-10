import * as THREE from "three";

export function createMetalMaterial(type) {
  const map = {
    gold: { color: "#d4af37", roughness: 0.25 },
    silver: { color: "#c0c0c0", roughness: 0.3 },
    rose: { color: "#b76e79", roughness: 0.35 },
  };

  const m = map[type] || map.gold;

  return new THREE.MeshPhysicalMaterial({
    color: m.color,
    metalness: 1,
    roughness: m.roughness,
    envMapIntensity: 2,
    clearcoat: 1,
  });
}

export function createStoneMaterial(type) {
  const map = {
    diamond: { color: "#ffffff", ior: 2.4 },
    ruby: { color: "#e0115f", ior: 1.77 },
    emerald: { color: "#50c878", ior: 1.57 },
    sapphire: { color: "#0f52ba", ior: 1.77 },
  };

  const s = map[type] || map.diamond;

  return new THREE.MeshPhysicalMaterial({
    color: s.color,
    metalness: 0,
    roughness: 0,
    transmission: 1,
    ior: s.ior,
    thickness: 0.6,
    transparent: true,
    envMapIntensity: 3,
  });
}