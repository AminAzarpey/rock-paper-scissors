import { GameChoice, GameResult } from "../types/game";
import { playWinAnimation } from "./animation";
import { useTranslation } from "../store/useTranslationStore";

export const choices: GameChoice[] = ["rock", "paper", "scissors"];

export const getComputerChoice = (): GameChoice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

export const determineWinner = (
  userChoice: GameChoice,
  computerChoice: GameChoice
): GameResult => {
  if (userChoice === computerChoice) {
    return "draw";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  }

  return "lose";
};

export const handleGameResult = (
  result: GameResult,
  setScore: (score: number) => void,
  currentScore: number
) => {
  if (result === "win") {
    playWinAnimation();
    setScore(currentScore + 1);
  } else if (result === "lose") {
    setScore(currentScore - 1);
  }
};

export const getResultMessage = (result: GameResult): string => {
  const { t } = useTranslation();
  switch (result) {
    case "win":
      return t("win");
    case "lose":
      return t("lose");
    case "draw":
      return t("draw");
    default:
      return "";
  }
};
