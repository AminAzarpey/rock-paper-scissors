export type GameChoice = "rock" | "paper" | "scissors";
export type GameResult = "win" | "lose" | "tie";
export type GameMode = "1round" | "3round" | "5round" | "infinite";
export type GamePhase = "ready" | "playing" | "ended";

export interface GameHistory {
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: GameResult;
}

export interface GameStats {
  playerScore: number;
  computerScore: number;
  playerWinsTotal: number;
  computerWinsTotal: number;
  draws: number;
  round: number;
}
