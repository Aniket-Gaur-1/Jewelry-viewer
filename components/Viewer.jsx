"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Scene from "./Scene";
import Capture from "./Capture";
import Controls from "./Controls";

function ThreeCanvas({ file, materialType, stoneType, bg, autoRotate, rotateSpeed, environment, lightIntensity, setCaptureFn }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene
        file={file} materialType={materialType} stoneType={stoneType} bg={bg}
        autoRotate={autoRotate} rotateSpeed={rotateSpeed}
        environment={environment} lightIntensity={lightIntensity}
      />
      <Capture setCaptureFn={setCaptureFn} bg={bg} />
    </Canvas>
  );
}

export default function Viewer() {
  const [file, setFile]                     = useState(null);
  const [materialType, setMaterialType]     = useState("original");
  const [stoneType, setStoneType]           = useState("original");
  const [bg, setBg]                         = useState("black");
  const [captureImage, setCaptureImage]     = useState(null);
  const [selectedViews, setSelectedViews]   = useState([]);
  const [includeCurrent, setIncludeCurrent] = useState(true);
  const [autoRotate, setAutoRotate]         = useState(true);
  const [environment, setEnvironment]       = useState("studio");
  const [lightIntensity, setLightIntensity] = useState(2);
  const [rotateSpeed, setRotateSpeed]       = useState(1.5);

  const applyPreset = (type) => {
    const presets = {
      ecommerce: { env: "studio",    bg: "white", light: 2.5, mat: "18k-yellow-gold", rot: false, speed: 1   },
      luxury:    { env: "sunset",    bg: "black", light: 1.8, mat: "24k-gold",        rot: true,  speed: 1.5 },
      dark:      { env: "night",     bg: "black", light: 1.2, mat: "sterling-silver", rot: true,  speed: 2   },
      studio:    { env: "warehouse", bg: "white", light: 3,   mat: "platinum",        rot: false, speed: 1   },
    };
    const p = presets[type];
    if (!p) return;
    setEnvironment(p.env); setBg(p.bg); setLightIntensity(p.light);
    setMaterialType(p.mat); setAutoRotate(p.rot); setRotateSpeed(p.speed);
  };

  const isLight = bg === "white";
  const bgStyle = bg === "transparent"
    ? { backgroundImage: "linear-gradient(45deg,#444 25%,transparent 25%),linear-gradient(-45deg,#444 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#444 75%),linear-gradient(-45deg,transparent 75%,#444 75%)", backgroundSize: "16px 16px", backgroundPosition: "0 0,0 8px,8px -8px,-8px 0px", backgroundColor: "#666" }
    : { backgroundColor: isLight ? "#ffffff" : "#111111" };

  return (
    <div className="relative w-screen h-screen overflow-hidden selection:bg-white/10">
      <div className="absolute inset-0 transition-colors duration-500" style={bgStyle} />
      <div className="absolute inset-0">
        <ThreeCanvas file={file} materialType={materialType} stoneType={stoneType}
          bg={bg} autoRotate={autoRotate} rotateSpeed={rotateSpeed}
          environment={environment} lightIntensity={lightIntensity}
          setCaptureFn={setCaptureImage} />
      </div>
      {!file && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-40">
            <div className="w-px h-12 mx-auto animate-pulse" style={{ background: isLight ? "#000" : "#fff" }} />
            <p className="text-[10px] tracking-[0.5em] uppercase font-light" style={{ color: isLight ? "#000" : "#fff" }}>
              Awaiting_Geometry
            </p>
          </div>
        </div>
      )}
      <Controls
        setFile={setFile} materialType={materialType} setMaterialType={setMaterialType}
        stoneType={stoneType} setStoneType={setStoneType}
        bg={bg} setBg={setBg} captureImage={captureImage}
        selectedViews={selectedViews} setSelectedViews={setSelectedViews}
        includeCurrent={includeCurrent} setIncludeCurrent={setIncludeCurrent}
        autoRotate={autoRotate} setAutoRotate={setAutoRotate}
        rotateSpeed={rotateSpeed} setRotateSpeed={setRotateSpeed}
        environment={environment} setEnvironment={setEnvironment}
        lightIntensity={lightIntensity} setLightIntensity={setLightIntensity}
        applyPreset={applyPreset}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[size:40px_40px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
    </div>
  );
}