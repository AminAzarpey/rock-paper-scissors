import { create } from "zustand";
import {
  GameChoice,
  GameResult,
  GameHistory as GameHistoryType,
  GameMode,
} from "../types/game";

interface GameState {
  playerChoice: GameChoice | null;
  computerChoice: GameChoice | null;
  result: GameResult | null;
  score: number;
  history: GameHistoryType[];
  isRoundModalOpen: boolean;
  isWinnerModalOpen: boolean;
  gameMode: GameMode;
  isGameStarted: boolean;
  isGameEnded: boolean;
  setGameMode: (mode: GameMode) => void;
  setPlayerChoice: (choice: GameChoice) => void;
  closeRoundModal: () => void;
  closeWinnerModal: () => void;
  resetGame: () => void;
}

const GAME_CHOICES: GameChoice[] = ["rock", "paper", "scissors"];

const getComputerChoice = (): GameChoice => {
  return GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];
};

const WINNING_COMBINATIONS: Record<GameChoice, GameChoice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const getGameResult = (
  playerChoice: GameChoice,
  computerChoice: GameChoice
): GameResult => {
  if (playerChoice === computerChoice) return "tie";
  return WINNING_COMBINATIONS[playerChoice] === computerChoice ? "win" : "lose";
};

const getNewScore = (currentScore: number, result: GameResult): number => {
  const scoreChanges: Record<GameResult, number> = {
    win: 1,
    lose: -1,
    tie: 0,
  };
  return currentScore + scoreChanges[result];
};

const getRoundLimit = (gameMode: GameMode): number => {
  const roundLimits: Record<GameMode, number> = {
    "1round": 1,
    "3round": 3,
    "5round": 5,
    infinite: Infinity,
  };
  return roundLimits[gameMode];
};

const isGameFinished = (gameMode: GameMode, historyLength: number): boolean => {
  return historyLength >= getRoundLimit(gameMode);
};

export const useGameStore = create<GameState>((set, get) => ({
  playerChoice: null,
  computerChoice: null,
  result: null,
  score: 0,
  history: [],
  isRoundModalOpen: false,
  isWinnerModalOpen: false,
  gameMode: "3round",
  isGameStarted: false,
  isGameEnded: false,

  setGameMode: (mode) =>
    set({ gameMode: mode, isGameStarted: false, isGameEnded: false }),

  setPlayerChoice: (choice) => {
    const computerChoice = getComputerChoice();
    const result = getGameResult(choice, computerChoice);
    const newScore = getNewScore(get().score, result);
    const newHistory = [
      ...get().history,
      { playerChoice: choice, computerChoice, result },
    ];
    const isGameEnded = isGameFinished(get().gameMode, newHistory.length);

    set({
      playerChoice: choice,
      computerChoice,
      result,
      score: newScore,
      history: newHistory,
      isRoundModalOpen: true,
      isGameStarted: true,
      isGameEnded,
      isWinnerModalOpen: isGameEnded,
    });
  },

  closeRoundModal: () => set({ isRoundModalOpen: false }),

  closeWinnerModal: () => set({ isWinnerModalOpen: false }),

  resetGame: () =>
    set({
      playerChoice: null,
      computerChoice: null,
      result: null,
      score: 0,
      history: [],
      isRoundModalOpen: false,
      isWinnerModalOpen: false,
      isGameStarted: false,
      isGameEnded: false,
    }),
}));
