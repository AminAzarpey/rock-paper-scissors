import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { GameChoice, GameModel } from "../types/game";

interface GameModelsProps {
  type: GameChoice;
  modelProps: GameModel;
  isSelected?: boolean;
  onClick?: () => void;
}

const GameModels = ({
  type,
  modelProps,
  isSelected,
  onClick,
}: GameModelsProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (isSelected) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
  });

  const getGeometry = () => {
    switch (type) {
      case "rock":
        return <sphereGeometry args={[1, 32, 32]} />;
      case "paper":
        return <planeGeometry args={[2, 2]} />;
      case "scissors":
        return <boxGeometry args={[1, 1, 0.1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={modelProps.position}
      rotation={modelProps.rotation}
      scale={modelProps.scale}
      onClick={onClick}
    >
      {getGeometry()}
      <meshStandardMaterial color={modelProps.color} />
    </mesh>
  );
};

export default GameModels;
