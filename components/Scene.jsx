import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

import Model from "./Model";

export default function Scene({ file, materialType, bg, autoRotate , environment, lightIntensity , rotateSpeed}) {

  return (
    <>
      {bg === "white" && <color attach="background" args={["#ffffff"]} />}
      {bg === "black" && <color attach="background" args={["#111111"]} />}
      {bg !== "transparent" && (
  <color attach="background" args={[bg === "white" ? "#ffffff" : "#111111"]} />
  
)}

     
      <ambientLight intensity={0.05} />

      <directionalLight
  position={[10, 10, 5]}
  intensity={lightIntensity}
  castShadow
/>

<directionalLight
  position={[-8, 5, -5]}
  intensity={lightIntensity * 0.5}
/>

      <Environment preset={environment} />

      <Model file={file} materialType={materialType} />

      {bg !== "transparent" && (
  
  <ContactShadows
  position={[0, -1.2, 0]}
  opacity={0.8}
  scale={15}
  blur={2}
  far={6}
/>
)}

      <OrbitControls
  key={autoRotate ? "rotate-on" : "rotate-off"}  
  enableDamping
  dampingFactor={0.05}
  autoRotate={autoRotate}
  autoRotateSpeed={rotateSpeed}
  target={[0, 0, 0]}
/>

    </>
  );
}