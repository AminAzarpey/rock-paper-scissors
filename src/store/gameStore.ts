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
  wins: number;
  losses: number;
  draws: number;
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

export const useGameStore = create<GameState>((set, get) => ({
  playerChoice: null,
  computerChoice: null,
  result: null,
  score: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  history: [],
  isRoundModalOpen: false,
  isWinnerModalOpen: false,
  gameMode: "3round",
  isGameStarted: false,
  isGameEnded: false,

  setGameMode: (mode) =>
    set({ gameMode: mode, isGameStarted: false, isGameEnded: false }),

  setPlayerChoice: (choice) => {
    const computerChoice = ["rock", "paper", "scissors"][
      Math.floor(Math.random() * 3)
    ] as GameChoice;

    let result: GameResult;
    if (choice === computerChoice) {
      result = "tie";
    } else if (
      (choice === "rock" && computerChoice === "scissors") ||
      (choice === "paper" && computerChoice === "rock") ||
      (choice === "scissors" && computerChoice === "paper")
    ) {
      result = "win";
    } else {
      result = "lose";
    }

    const newScore =
      get().score + (result === "win" ? 1 : result === "lose" ? -1 : 0);
    const newHistory = [
      ...get().history,
      { playerChoice: choice, computerChoice, result },
    ];

    const isGameEnded =
      get().gameMode === "1round" ||
      (get().gameMode === "3round" && newHistory.length >= 3) ||
      (get().gameMode === "5round" && newHistory.length >= 5);

    set({
      playerChoice: choice,
      computerChoice,
      result,
      score: newScore,
      wins: get().wins + (result === "win" ? 1 : 0),
      losses: get().losses + (result === "lose" ? 1 : 0),
      draws: get().draws + (result === "tie" ? 1 : 0),
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
      wins: 0,
      losses: 0,
      draws: 0,
      history: [],
      isRoundModalOpen: false,
      isWinnerModalOpen: false,
      isGameStarted: false,
      isGameEnded: false,
    }),
}));
