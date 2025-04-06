import { GameResult } from "@rockPaperScissors/types";
import { TranslationKeys } from "@rockPaperScissors/store";

export type Choice = "rock" | "paper" | "scissors";
export const choices: Choice[] = ["rock", "paper", "scissors"];
export const getComputerChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};
export const determineWinner = (
  userChoice: Choice,
  computerChoice: Choice
): string => {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You win!";
  }

  return "You lose!";
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
