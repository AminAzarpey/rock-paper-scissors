import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import { useThemeStore } from "../store";
import HandModels from "./HandModels";
import useGameStore from "../store/gameStore";
import { GameChoice } from "../types/game";
import { Suspense } from "react";

const GameScene = () => {
  const { isDarkMode, theme } = useThemeStore();
  const { playerChoice, computerChoice, setPlayerChoice } = useGameStore();

  const modelProps = {
    rock: {
      position: [-2, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      color: isDarkMode ? theme.neutral : theme.accent,
    },
    paper: {
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      color: isDarkMode ? theme.background : theme.primary,
    },
    scissors: {
      position: [2, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      color: isDarkMode ? theme.accent : theme.secondary,
    },
  };

  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: isDarkMode ? theme.background : theme.primary }}
      >
        <Environment preset="city" background={false} />
        <Sky sunPosition={[10, 10, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />

        {Object.entries(modelProps).map(([type, props]) => (
          <HandModels
            key={type}
            type={type as GameChoice}
            {...props}
            isSelected={playerChoice === type || computerChoice === type}
            onClick={() => setPlayerChoice(type as GameChoice)}
          />
        ))}
      </Canvas>
    </Suspense>
  );
};

export default GameScene;
