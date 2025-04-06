import { GameResult, GameChoice } from "@rockPaperScissors/types";
import { TranslationKeys } from "@rockPaperScissors/store";

export const choices: GameChoice[] = ["rock", "paper", "scissors"];

export const getComputerChoice = (): GameChoice => {
  return choices[Math.floor(Math.random() * choices.length)];
};

export const determineWinner = (
  userChoice: GameChoice,
  computerChoice: GameChoice
): GameResult => {
  if (userChoice === computerChoice) return "tie";
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  )
    return "win";
  return "lose";
};

export const getResultMessage = (
  result: GameResult,
  t: (key: TranslationKeys) => string
): string => {
  switch (result) {
    case "win":
      return t("win");
    case "lose":
      return t("lose");
    case "draw":
      return t("tie");
    default:
      return "";
  }
};
