import { useEffect, useState, useMemo } from "react";
import { 
  STLLoader, 
  OBJLoader, 
  GLTFLoader, 
  ThreeMFLoader, 
  TDSLoader, 
  Rhino3dmLoader 
} from "three-stdlib";
import * as THREE from "three";
import { createMetalMaterial, createStoneMaterial } from "@/utils/materials";
import { normalizeGeometry, normalizeObject } from "@/utils/geometry";

export default function Model({ 
  file, 
  materialType = "gold", 
  stoneType = "diamond" 
}) {
  const [geometry, setGeometry] = useState(null);
  const [object, setObject] = useState(null);

  // 1. Stabilize materials using useMemo
  // This ensures the reference only changes when the type actually changes
  const metalMaterial = useMemo(() => createMetalMaterial(materialType), [materialType]);
  const stoneMaterial = useMemo(() => createStoneMaterial(stoneType), [stoneType]);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    const fileName = file.name.toLowerCase();

    reader.onload = (e) => {
      const contents = e.target.result;
      setObject(null);
      setGeometry(null);

      if (fileName.endsWith(".3dm")) {
        const loader = new Rhino3dmLoader();
        loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/');
        loader.parse(contents, (rhinoObj) => {
          normalizeObject(rhinoObj);
          setObject(rhinoObj);
        });
      } 
      else if (fileName.endsWith(".3ds")) {
        const loader = new TDSLoader();
        const group = loader.parse(contents);
        normalizeObject(group);
        setObject(group);
      } 
      else if (fileName.endsWith(".glb") || fileName.endsWith(".gltf")) {
        new GLTFLoader().parse(contents, "", (gltf) => {
          normalizeObject(gltf.scene);
          setObject(gltf.scene);
        });
      }
      else if (fileName.endsWith(".3mf")) {
        new ThreeMFLoader().parse(contents, (group) => {
          normalizeObject(group);
          setObject(group);
        });
      }
      else if (fileName.endsWith(".obj")) {
        const obj = new OBJLoader().parse(contents);
        normalizeObject(obj);
        setObject(obj);
      }
      else if (fileName.endsWith(".stl")) {
        const geo = new STLLoader().parse(contents);
        normalizeGeometry(geo);
        setGeometry(geo);
      }
    };

    if (fileName.endsWith(".obj")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  // 2. FIXED EFFECT: Differentiates Stones from Metal
  // We use the object ID and material types as dependencies to keep the array size constant
  useEffect(() => {
    if (!object || !metalMaterial || !stoneMaterial) return;

    object.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        const matName = child.material?.name?.toLowerCase() || "";

        // Keywords to identify stones in jewelry CAD files
        const isStone = 
          name.includes("stone") || 
          name.includes("gem") || 
          name.includes("diamond") || 
          name.includes("emerald") || 
          name.includes("ruby") ||
          matName.includes("stone") ||
          matName.includes("gem") ||
          matName.includes("diamond");

        if (isStone) {
          child.material = stoneMaterial;
        } else {
          child.material = metalMaterial;
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [object, metalMaterial, stoneMaterial]); // Dependencies are stable now

  if (object) return <primitive object={object} />;
  if (geometry) return <mesh geometry={geometry} material={metalMaterial} castShadow receiveShadow />;

  return null;
}