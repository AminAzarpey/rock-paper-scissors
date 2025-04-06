import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameChoice, GameResult } from "../types/game";

interface GameState {
  // Choices and winner
  player: GameChoice | null;
  setPlayer: (choice: GameChoice | null) => void;
  computer: GameChoice | null;
  setComputer: (choice: GameChoice | null) => void;
  winner: GameResult | null;
  setWinner: (w: GameResult | null) => void;

  // Round
  round: number;
  nextRound: () => void;
  resetRound: () => void;
  setRound: (num: number) => void;

  // Scoring
  playerScore: number;
  setPlayerScore: (score: number) => void;
  computerScore: number;
  setComputerScore: (score: number) => void;
  playerWinsTotal: number;
  setPlayerWinsTotal: (wins: number) => void;
  computerWinsTotal: number;
  setComputerWinsTotal: (wins: number) => void;

  // Game mode
  mode: "fiveWins" | "threeWins" | "sevenWins" | "endless";
  setMode: (
    gameMode: "fiveWins" | "threeWins" | "sevenWins" | "endless"
  ) => void;

  // Phases
  phase: "ready" | "playing" | "ended";
  setPhase: (gamePhase: "ready" | "playing" | "ended") => void;
  start: () => void;
  restart: () => void;
  end: () => void;
}

const useGameStore = create<GameState>()(
  subscribeWithSelector((set) => ({
    // Choices and winner
    player: null,
    setPlayer: (choice) => set({ player: choice }),
    computer: null,
    setComputer: (choice) => set({ computer: choice }),
    winner: null,
    setWinner: (w) => set({ winner: w }),

    // Round
    round: 0,
    nextRound: () => set((state) => ({ round: state.round + 1 })),
    resetRound: () => set({ round: 0 }),
    setRound: (num) => set({ round: num }),

    // Scoring
    playerScore: 0,
    setPlayerScore: (score) => set({ playerScore: score }),
    computerScore: 0,
    setComputerScore: (score) => set({ computerScore: score }),
    playerWinsTotal: 0,
    setPlayerWinsTotal: (wins) => set({ playerWinsTotal: wins }),
    computerWinsTotal: 0,
    setComputerWinsTotal: (wins) => set({ computerWinsTotal: wins }),

    // Game mode
    mode: "fiveWins",
    setMode: (gameMode) => set({ mode: gameMode }),

    // Phases
    phase: "ready",
    setPhase: (gamePhase) => set({ phase: gamePhase }),
    start: () =>
      set((state) => {
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      }),
    restart: () =>
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended") {
          return { phase: "ready" };
        }
        return {};
      }),
    end: () =>
      set((state) => {
        if (state.phase === "playing") {
          return { phase: "ended" };
        }
        return {};
      }),
  }))
);

export default useGameStore;
