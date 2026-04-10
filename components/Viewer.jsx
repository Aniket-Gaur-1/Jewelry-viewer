"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Scene from "./Scene";
import Capture from "./Capture";
import Controls from "./Controls";

export default function Viewer() {
  const [file, setFile] = useState(null);
  const [materialType, setMaterialType] = useState("gold");
  const [bg, setBg] = useState("black"); // Default to black for luxury feel
  const [captureImage, setCaptureImage] = useState(null);
  const [selectedViews, setSelectedViews] = useState([]);
  const [includeCurrent, setIncludeCurrent] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [environment, setEnvironment] = useState("studio");
  const [lightIntensity, setLightIntensity] = useState(2);
  const [rotateSpeed, setRotateSpeed] = useState(1.5);

  const applyPreset = (type) => {
    const presets = {
      ecommerce: { env: "studio", bg: "white", light: 2.5, mat: "gold", rot: false, speed: 1 },
      luxury: { env: "sunset", bg: "black", light: 1.8, mat: "gold", rot: true, speed: 1.5 },
      dark: { env: "night", bg: "black", light: 1.2, mat: "silver", rot: true, speed: 2 },
      studio: { env: "warehouse", bg: "white", light: 3, mat: "silver", rot: false, speed: 1 }
    };
    const p = presets[type];
    if (p) {
      setEnvironment(p.env); setBg(p.bg); setLightIntensity(p.light);
      setMaterialType(p.mat); setAutoRotate(p.rot); setRotateSpeed(p.speed);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#020202] overflow-hidden selection:bg-white/10">
      {/* 3D Viewport Layer */}
      <div className="absolute inset-0">
        {!file && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]">
            <div className="text-center space-y-4 opacity-40">
              <div className="w-[1px] h-12 bg-white mx-auto animate-pulse" />
              <p className="text-[10px] tracking-[0.5em] uppercase font-light">Awaiting_Geometry</p>
            </div>
          </div>
        )}
        <Canvas
          shadows
          camera={{ position: [0, 0, 6], fov: 40 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
          <Scene
            file={file}
            materialType={materialType}
            bg={bg}
            autoRotate={autoRotate}
            rotateSpeed={rotateSpeed}
            environment={environment}
            lightIntensity={lightIntensity}
          />
          <Capture setCaptureFn={setCaptureImage} bg={bg} />
        </Canvas>
      </div>

      {/* Interactive HUD Layer */}
      <Controls
        setFile={setFile}
        materialType={materialType}
        setMaterialType={setMaterialType}
        bg={bg}
        setBg={setBg}
        captureImage={captureImage}
        selectedViews={selectedViews}
        setSelectedViews={setSelectedViews}
        includeCurrent={includeCurrent}
        setIncludeCurrent={setIncludeCurrent}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        rotateSpeed={rotateSpeed}
        setRotateSpeed={setRotateSpeed}
        environment={environment}
        setEnvironment={setEnvironment}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
        applyPreset={applyPreset}
      />
      
      {/* Visual Guides */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[size:50px_50px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
    </div>
  );
}