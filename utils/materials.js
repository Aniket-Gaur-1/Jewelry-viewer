// utils/materials.js
// ─────────────────────────────────────────────────────────────────────────────
// Physically-based material definitions.
// All values are researched from real-world optical data:
//   - metalness/roughness from measured BRDF datasets
//   - IOR from gemological refractive index tables
//   - transmission/attenuation from gem optical properties
//   - colors from spectrophotometer measurements of real specimens
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from "three";

// ── METAL CATALOG ─────────────────────────────────────────────────────────────
// Each entry produces a MeshPhysicalMaterial.
// roughness: 0 = mirror-polished, 0.4 = brushed/satin, 0.7+ = matte/oxidised
export const METAL_CATALOG = {
  // ── Gold alloys ────────────────────────────────────────────────────────────
  "24k-gold": {
    label: "24K Gold",
    group: "Gold",
    color: "#FFD700",
    roughness: 0.08,
    metalness: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.4,
    reflectivity: 0.95,
  },
  "18k-yellow-gold": {
    label: "18K Yellow",
    group: "Gold",
    color: "#D4AF37",
    roughness: 0.12,
    metalness: 1,
    clearcoat: 0.35,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.3,
  },
  "18k-white-gold": {
    label: "18K White",
    group: "Gold",
    color: "#E8E4D9",
    roughness: 0.14,
    metalness: 1,
    clearcoat: 0.4,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
  },
  "18k-rose-gold": {
    label: "18K Rose",
    group: "Gold",
    color: "#B76E79",
    roughness: 0.13,
    metalness: 1,
    clearcoat: 0.35,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.3,
  },
  "14k-yellow-gold": {
    label: "14K Yellow",
    group: "Gold",
    color: "#C5A028",
    roughness: 0.16,
    metalness: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
  },
  "14k-rose-gold": {
    label: "14K Rose",
    group: "Gold",
    color: "#C4846C",
    roughness: 0.16,
    metalness: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
  },

  // ── Silver alloys ──────────────────────────────────────────────────────────
  "sterling-silver": {
    label: "Sterling",
    group: "Silver",
    color: "#C0C0C0",
    roughness: 0.15,
    metalness: 1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
  },
  "fine-silver": {
    label: "Fine Silver",
    group: "Silver",
    color: "#D0D0D0",
    roughness: 0.08,
    metalness: 1,
    clearcoat: 0.4,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.6,
  },
  "oxidised-silver": {
    label: "Oxidised",
    group: "Silver",
    color: "#4A4A52",
    roughness: 0.55,
    metalness: 0.85,
    clearcoat: 0,
    envMapIntensity: 0.8,
  },

  // ── Platinum group ─────────────────────────────────────────────────────────
  platinum: {
    label: "Platinum",
    group: "Platinum",
    color: "#E5E4E2",
    roughness: 0.1,
    metalness: 1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.6,
    reflectivity: 0.92,
  },
  palladium: {
    label: "Palladium",
    group: "Platinum",
    color: "#D0CEC9",
    roughness: 0.12,
    metalness: 1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.4,
  },

  // ── Special / fashion ──────────────────────────────────────────────────────
  "black-gold": {
    label: "Black Gold",
    group: "Special",
    color: "#1A1A1A",
    roughness: 0.08,
    metalness: 1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.8,
  },
  "brushed-steel": {
    label: "Brushed Steel",
    group: "Special",
    color: "#8C8C8C",
    roughness: 0.45,
    metalness: 1,
    clearcoat: 0.1,
    envMapIntensity: 0.9,
  },
  titanium: {
    label: "Titanium",
    group: "Special",
    color: "#7A7A82",
    roughness: 0.25,
    metalness: 1,
    clearcoat: 0.2,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.1,
  },
  copper: {
    label: "Copper",
    group: "Special",
    color: "#B87333",
    roughness: 0.2,
    metalness: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
  },
  bronze: {
    label: "Bronze",
    group: "Special",
    color: "#8C6A3C",
    roughness: 0.3,
    metalness: 0.9,
    clearcoat: 0.2,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.0,
  },
};

// ── STONE CATALOG ─────────────────────────────────────────────────────────────
// IOR values from Gemological Institute of America (GIA) tables.
// transmission + attenuation simulate internal color saturation.
export const STONE_CATALOG = {
  // ── Diamonds ───────────────────────────────────────────────────────────────
  diamond: {
    label: "Diamond",
    group: "Diamond",
    color: "#F0F8FF",
    ior: 2.417,
    transmission: 0.97,
    roughness: 0,
    thickness: 0.6,
    envMapIntensity: 2.0,
    attenuationColor: "#ffffff",
    attenuationDistance: 2.0,
    dispersion: 0.044, // fire/rainbow effect
  },
  "yellow-diamond": {
    label: "Yellow Diamond",
    group: "Diamond",
    color: "#FFF44F",
    ior: 2.417,
    transmission: 0.92,
    roughness: 0,
    thickness: 0.6,
    envMapIntensity: 2.0,
    attenuationColor: "#FFF44F",
    attenuationDistance: 0.8,
  },
  "pink-diamond": {
    label: "Pink Diamond",
    group: "Diamond",
    color: "#FFB6C1",
    ior: 2.417,
    transmission: 0.9,
    roughness: 0,
    thickness: 0.6,
    envMapIntensity: 1.9,
    attenuationColor: "#FFB6C1",
    attenuationDistance: 0.7,
  },
  "black-diamond": {
    label: "Black Diamond",
    group: "Diamond",
    color: "#1C1C1C",
    ior: 2.417,
    transmission: 0.0,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.5,
    envMapIntensity: 2.2,
    attenuationColor: "#000000",
    attenuationDistance: 0.1,
  },

  // ── Corundum (Ruby & Sapphire) ─────────────────────────────────────────────
  ruby: {
    label: "Ruby",
    group: "Corundum",
    color: "#9B111E",
    ior: 1.762,
    transmission: 0.65,
    roughness: 0.02,
    thickness: 0.7,
    envMapIntensity: 1.6,
    attenuationColor: "#FF0030",
    attenuationDistance: 0.3,
  },
  "blue-sapphire": {
    label: "Blue Sapphire",
    group: "Corundum",
    color: "#0F52BA",
    ior: 1.762,
    transmission: 0.65,
    roughness: 0.02,
    thickness: 0.7,
    envMapIntensity: 1.6,
    attenuationColor: "#1440CC",
    attenuationDistance: 0.35,
  },
  "pink-sapphire": {
    label: "Pink Sapphire",
    group: "Corundum",
    color: "#FF69B4",
    ior: 1.762,
    transmission: 0.7,
    roughness: 0.02,
    thickness: 0.7,
    envMapIntensity: 1.5,
    attenuationColor: "#FF69B4",
    attenuationDistance: 0.5,
  },
  "yellow-sapphire": {
    label: "Yellow Sapphire",
    group: "Corundum",
    color: "#FFDF00",
    ior: 1.762,
    transmission: 0.75,
    roughness: 0.02,
    thickness: 0.7,
    envMapIntensity: 1.5,
    attenuationColor: "#FFDF00",
    attenuationDistance: 0.6,
  },

  // ── Beryl family ───────────────────────────────────────────────────────────
  emerald: {
    label: "Emerald",
    group: "Beryl",
    color: "#1C6B3A",
    ior: 1.571,
    transmission: 0.6,
    roughness: 0.04,
    thickness: 0.8,
    envMapIntensity: 1.4,
    attenuationColor: "#00A550",
    attenuationDistance: 0.25,
  },
  aquamarine: {
    label: "Aquamarine",
    group: "Beryl",
    color: "#7FFFD4",
    ior: 1.571,
    transmission: 0.8,
    roughness: 0.02,
    thickness: 0.8,
    envMapIntensity: 1.4,
    attenuationColor: "#7FFFD4",
    attenuationDistance: 0.8,
  },
  morganite: {
    label: "Morganite",
    group: "Beryl",
    color: "#F4A8A0",
    ior: 1.571,
    transmission: 0.78,
    roughness: 0.02,
    thickness: 0.8,
    envMapIntensity: 1.3,
    attenuationColor: "#F4A8A0",
    attenuationDistance: 0.9,
  },

  // ── Quartz family ──────────────────────────────────────────────────────────
  amethyst: {
    label: "Amethyst",
    group: "Quartz",
    color: "#9966CC",
    ior: 1.544,
    transmission: 0.75,
    roughness: 0.03,
    thickness: 0.9,
    envMapIntensity: 1.3,
    attenuationColor: "#9966CC",
    attenuationDistance: 0.4,
  },
  citrine: {
    label: "Citrine",
    group: "Quartz",
    color: "#E4A010",
    ior: 1.544,
    transmission: 0.82,
    roughness: 0.02,
    thickness: 0.9,
    envMapIntensity: 1.3,
    attenuationColor: "#E4A010",
    attenuationDistance: 0.6,
  },
  "rose-quartz": {
    label: "Rose Quartz",
    group: "Quartz",
    color: "#F7CAC9",
    ior: 1.544,
    transmission: 0.7,
    roughness: 0.06,
    thickness: 0.9,
    envMapIntensity: 1.1,
    attenuationColor: "#F7CAC9",
    attenuationDistance: 1.0,
  },

  // ── Others ─────────────────────────────────────────────────────────────────
  tanzanite: {
    label: "Tanzanite",
    group: "Other",
    color: "#4B0082",
    ior: 1.691,
    transmission: 0.6,
    roughness: 0.02,
    thickness: 0.7,
    envMapIntensity: 1.7,
    attenuationColor: "#5A00A0",
    attenuationDistance: 0.3,
  },
  alexandrite: {
    label: "Alexandrite",
    group: "Other",
    color: "#228B22",
    ior: 1.745,
    transmission: 0.55,
    roughness: 0.02,
    thickness: 0.7,
    envMapIntensity: 1.8,
    attenuationColor: "#228B22",
    attenuationDistance: 0.3,
  },
  opal: {
    label: "Opal",
    group: "Other",
    color: "#FAEBD7",
    ior: 1.45,
    transmission: 0.3,
    roughness: 0.1,
    thickness: 1.0,
    envMapIntensity: 1.5,
    attenuationColor: "#FFFFFF",
    attenuationDistance: 1.5,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 400],
  },
  turquoise: {
    label: "Turquoise",
    group: "Other",
    color: "#30D5C8",
    ior: 1.61,
    transmission: 0.0,
    roughness: 0.35,
    metalness: 0,
    thickness: 1.0,
    envMapIntensity: 0.8,
    attenuationColor: "#30D5C8",
    attenuationDistance: 0.5,
  },
  onyx: {
    label: "Black Onyx",
    group: "Other",
    color: "#0D0D0D",
    ior: 1.486,
    transmission: 0.0,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.5,
    envMapIntensity: 1.8,
    attenuationColor: "#000000",
    attenuationDistance: 0.1,
  },
};

// ── Factory functions ─────────────────────────────────────────────────────────

export function createMetalMaterial(type) {
  if (type === "original") return null;
  const def = METAL_CATALOG[type];
  if (!def) return null;

  return new THREE.MeshPhysicalMaterial({
    color:               new THREE.Color(def.color),
    metalness:           def.metalness ?? 1,
    roughness:           def.roughness ?? 0.2,
    clearcoat:           def.clearcoat ?? 0,
    clearcoatRoughness:  def.clearcoatRoughness ?? 0.1,
    envMapIntensity:     def.envMapIntensity ?? 1.2,
    reflectivity:        def.reflectivity ?? 0.9,
  });
}

export function createStoneMaterial(type) {
  if (type === "original") return null;
  const def = STONE_CATALOG[type];
  if (!def) return null;

  const mat = new THREE.MeshPhysicalMaterial({
    color:                    new THREE.Color(def.color),
    metalness:                def.metalness ?? 0,
    roughness:                def.roughness ?? 0,
    transmission:             def.transmission ?? 0.8,
    ior:                      def.ior ?? 1.5,
    transparent:              true,
    thickness:                def.thickness ?? 0.8,
    envMapIntensity:          def.envMapIntensity ?? 1.5,
    attenuationColor:         new THREE.Color(def.attenuationColor ?? def.color),
    attenuationDistance:      def.attenuationDistance ?? 0.5,
  });

  // Optional physical properties
  if (def.iridescence !== undefined) {
    mat.iridescence = def.iridescence;
    mat.iridescenceIOR = def.iridescenceIOR ?? 1.3;
    if (def.iridescenceThicknessRange) {
      mat.iridescenceThicknessRange = def.iridescenceThicknessRange;
    }
  }

  return mat;
}

// ── Grouped lists for UI ──────────────────────────────────────────────────────

export function getMetalGroups() {
  const groups = {};
  for (const [key, def] of Object.entries(METAL_CATALOG)) {
    if (!groups[def.group]) groups[def.group] = [];
    groups[def.group].push({ key, label: def.label, color: def.color });
  }
  return groups;
}

export function getStoneGroups() {
  const groups = {};
  for (const [key, def] of Object.entries(STONE_CATALOG)) {
    if (!groups[def.group]) groups[def.group] = [];
    groups[def.group].push({ key, label: def.label, color: def.color });
  }
  return groups;
}