import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { WelcomeOverlay} from "./components/WelcomeOverlay";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {!showLoader && <UI />}
      {showLoader && (
        <WelcomeOverlay onFinish={() => setShowLoader(false)} />
      )}

      <Canvas
        shadows
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
