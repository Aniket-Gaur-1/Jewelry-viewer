import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Model from "./Model";

export default function Scene({
  file, materialType, stoneType, bg,
  autoRotate, environment, lightIntensity, rotateSpeed,
}) {
  const isDark = bg === "black" || bg === "transparent";

  return (
    <>
      {bg === "white" && <color attach="background" args={["#ffffff"]} />}
      {bg === "black" && <color attach="background" args={["#111111"]} />}

      <ambientLight intensity={isDark ? 0.6 : 0.4} />
      <directionalLight position={[5, 8, 5]} intensity={lightIntensity * 0.8} />
      <directionalLight position={[-6, 4, -4]} intensity={lightIntensity * 0.3} />
      {isDark && <directionalLight position={[0, -4, 2]} intensity={lightIntensity * 0.15} />}

      <Environment preset={environment} background={false} />

      <Model file={file} materialType={materialType} stoneType={stoneType} />

      {bg !== "transparent" && (
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={isDark ? 0.6 : 0.4}
          scale={12} blur={3} far={5} frames={1}
        />
      )}

      <OrbitControls
        key={autoRotate ? "auto-on" : "auto-off"}
        enableDamping dampingFactor={0.08}
        autoRotate={autoRotate} autoRotateSpeed={rotateSpeed}
        target={[0, 0, 0]}
        minPolarAngle={0} maxPolarAngle={Math.PI}
        minDistance={1.5} maxDistance={20}
      />
    </>
  );
}