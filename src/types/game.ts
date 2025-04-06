export type GameChoice = "rock" | "paper" | "scissors";
export type GameResult = "win" | "lose" | "draw";
export type GameMode = "fiveWins" | "threeWins" | "sevenWins" | "endless";
export type GamePhase = "ready" | "playing" | "ended";

export interface GameHistory {
  round: number;
  player: GameChoice;
  computer: GameChoice;
  result: GameResult;
}

export interface GameState {
  playerChoice: GameChoice | null;
  computerChoice: GameChoice | null;
  result: GameResult | null;
  score: number;
  wins: number;
  losses: number;
  draws: number;
  currentRound: number;
  history: GameHistory[];
  setPlayerChoice: (choice: GameChoice) => void;
  resetGame: () => void;
}

export interface GameModel {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}
