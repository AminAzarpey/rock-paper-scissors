import { Theme } from "@rockPaperScissors/types";
import { applyTheme, defaultTheme } from "@rockPaperScissors/utils";
import { create } from "zustand";

interface ThemeStore {
  isDarkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  theme: defaultTheme,

  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    document.documentElement.classList.toggle("dark");
  },

  setTheme: (theme: Theme) => {
    set({ theme });
    applyTheme(theme);
  },
}));
