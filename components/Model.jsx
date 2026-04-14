import { useEffect, useRef, useState } from "react";
import {
  STLLoader,
  OBJLoader,
  GLTFLoader,
  Rhino3dmLoader,
} from "three-stdlib";
import * as THREE from "three";
import { createMetalMaterial, createStoneMaterial } from "@/utils/materials";
import { normalizeGeometry, normalizeObject } from "@/utils/geometry";

export default function Model({ file, materialType, stoneType }) {
  const [geometry, setGeometry] = useState(null);
  const [object, setObject] = useState(null);

  const originalMaterials = useRef(new Map());
  const metalMatRef = useRef(null);
  const stoneMatRef = useRef(null);
  const prevMetal = useRef(null);
  const prevStone = useRef(null);

  // Sync material refs when type changes — done inline (not in effect)
  // so they're ready before the apply effects run
  if (prevMetal.current !== materialType) {
    prevMetal.current = materialType;
    metalMatRef.current = createMetalMaterial(materialType);
  }
  if (prevStone.current !== stoneType) {
    prevStone.current = stoneType;
    stoneMatRef.current = createStoneMaterial(stoneType);
  }

  // ── File loading ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    const fileName = file.name.toLowerCase();

    reader.onload = (e) => {
      const contents = e.target.result;
      setObject(null);
      setGeometry(null);
      originalMaterials.current.clear();

      try {
        if (fileName.endsWith(".3dm")) {
          const loader = new Rhino3dmLoader();
          loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/");
          loader.parse(contents, (obj) => { normalizeObject(obj); setObject(obj); });
        } else if (fileName.endsWith(".obj")) {
          const obj = new OBJLoader().parse(contents);
          normalizeObject(obj);
          setObject(obj);
        } else if (fileName.endsWith(".stl")) {
          const geo = new STLLoader().parse(contents);
          normalizeGeometry(geo);
          setGeometry(geo);
        } else if (fileName.endsWith(".glb") || fileName.endsWith(".gltf")) {
          new GLTFLoader().parse(contents, "", (gltf) => {
            normalizeObject(gltf.scene);
            setObject(gltf.scene);
          });
        }
      } catch (err) {
        console.error("Error parsing 3D file:", err);
      }
    };

    if (fileName.endsWith(".obj") || fileName.endsWith(".gltf")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  // Apply on new object load
  useEffect(() => {
    if (!object) return;
    applyMaterials(object, metalMatRef.current, stoneMatRef.current, originalMaterials.current);
  }, [object]);

  // Apply on type change only
  useEffect(() => {
    if (!object) return;
    applyMaterials(object, metalMatRef.current, stoneMatRef.current, originalMaterials.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialType, stoneType]);

  if (geometry) {
    return (
      <mesh
        geometry={geometry}
        material={metalMatRef.current ?? new THREE.MeshStandardMaterial({ color: "#c0c0c0", metalness: 0.8, roughness: 0.3 })}
        castShadow={false}
        receiveShadow
      />
    );
  }

  if (object?.isObject3D) {
    return <primitive object={object} />;
  }

  return null;
}

function applyMaterials(object, metalMat, stoneMat, originalMaterials) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    // Snapshot original once
    if (!originalMaterials.has(child.uuid)) {
      const orig = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone();
      originalMaterials.set(child.uuid, orig);
    }

    const name    = child.name?.toLowerCase() ?? "";
    const matName = (Array.isArray(child.material)
      ? child.material[0]?.name
      : child.material?.name
    )?.toLowerCase() ?? "";

    const isStone =
      name.includes("stone") || name.includes("gem") || name.includes("diamond") ||
      matName.includes("gem") || matName.includes("stone") || matName.includes("diamond");

    const original = originalMaterials.get(child.uuid);
    const target   = isStone
      ? (stoneMat ?? (Array.isArray(original) ? original[0] : original))
      : (metalMat ?? (Array.isArray(original) ? original[0] : original));

    if (child.material !== target) {
      child.material = target;
      child.material.needsUpdate = true;
    }

    /*
      castShadow = false on transmission materials (gems).
      Shadow maps recalculate transmission depth every frame during camera
      movement — this is the primary cause of the gem flickering on dark bg.
      Metals keep receiveShadow only; gems get neither.
    */
    const isTrans = child.material?.transmission > 0;
    child.castShadow    = false;   // never castShadow — let ContactShadows handle it
    child.receiveShadow = !isTrans; // gems don't receive shadows either (causes artefacts)
  });
}