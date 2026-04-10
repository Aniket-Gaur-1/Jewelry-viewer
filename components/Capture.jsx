import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function Capture({ setCaptureFn, bg }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    setCaptureFn(() => async ({ currentView, selectedViews }) => {

      

      if (currentView) {
        const flash = document.createElement("div");
  flash.style.cssText = "position:fixed;inset:0;background:white;z-index:100;opacity:0.5;";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 100);
        await new Promise((r) => requestAnimationFrame(r));
gl.render(scene, camera);
        gl.render(scene, camera);

        const link = document.createElement("a");
        link.download = "jewelry-current.png";
        link.href = gl.domElement.toDataURL("image/png");
        link.click();
      }

      if (selectedViews?.length > 0) {
        const originalPos = camera.position.clone();
        const originalQuat = camera.quaternion.clone();

        const views = {
          front: [0, 0, 6],
          side: [6, 0, 0],
          top: [0, 6, 0],
        };

        for (let v of selectedViews) {
          camera.position.set(...views[v]);
          camera.lookAt(0, 0, 0);

          gl.render(scene, camera);

          const link = document.createElement("a");
          link.download = `jewelry-${v}.png`;
          link.href = gl.domElement.toDataURL("image/png");
          link.click();

          await new Promise((r) => setTimeout(r, 300));
        }

        camera.position.copy(originalPos);
        camera.quaternion.copy(originalQuat);
      }
    });
  }, [gl, scene, camera, setCaptureFn, bg]);

  return null;
}