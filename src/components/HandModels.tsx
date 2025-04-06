import { GameChoice } from "../types/game";
import { Rock } from "./models/Rock";
import { Paper } from "./models/Paper";
import { Scissors } from "./models/Scissors";

interface HandModelsProps {
  type: GameChoice;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const HandModels = ({
  type,
  position,
  rotation,
  scale,
  color,
  isSelected,
  onClick,
}: HandModelsProps) => {
  switch (type) {
    case "rock":
      return (
        <Rock
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={onClick}
        />
      );
    case "paper":
      return (
        <Paper
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={onClick}
        />
      );
    case "scissors":
      return (
        <Scissors
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={onClick}
        />
      );
  }
};

export default HandModels;
