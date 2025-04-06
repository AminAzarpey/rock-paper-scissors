import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define types for the language and translation keys
type Language = "en" | "fa";

export type TranslationKeys = keyof typeof translations.en;

type TranslationStore = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
};

// Translations for the Rock Paper Scissors game in English and Persian
const translations = {
  en: {
    title: "Rock Paper Scissors",
    welcomeMessage: "Welcome to Rock Paper Scissors!",
    selectChoice: "Select your choice",
    rock: "Rock",
    paper: "Paper",
    scissors: "Scissors",
    yourChoice: "Your Choice: ",
    computerChoice: "Computer's Choice: ",
    result: "Result: ",
    win: "You win!",
    lose: "You lose!",
    tie: "It's a tie!",
    reset: "Restart Game",
    english: "English",
    persian: "Persian",
    colorPalette: "Color Palette",
    language: "Language",
    rockPaperScissors: "Rock Paper Scissors",
    score: "Score",
    makeYourChoice: "Make your choice",
    gameHistory: "Game History",
    round: "Round",
    congratulations: "Congratulations!",
    finalScore: "Final Score",
    wins: "Wins",
    losses: "Losses",
    draws: "Draws",
    playAgain: "Play Again",
    selectGameMode: "Select Game Mode",
    resetGame: "Reset Game",
    gameOver: "Game Over",
    youWon: "You Won!",
    youLost: "You Lost!",
    itsATie: "It's a Tie!",
    player: "Player",
    computer: "Computer",
    roundResult: "Round Result",
    continue: "Continue",
  },
  fa: {
    title: "سنگ کاغذ قیچی",
    welcomeMessage: "به بازی سنگ کاغذ قیچی خوش آمدید!",
    selectChoice: "انتخاب خود را انجام دهید",
    rock: "سنگ",
    paper: "کاغذ",
    scissors: "قیچی",
    yourChoice: "انتخاب شما: ",
    computerChoice: "انتخاب کامپیوتر: ",
    result: "نتیجه: ",
    win: "شما برنده شدید!",
    lose: "شما باختید!",
    tie: "مساوی شد!",
    reset: "شروع مجدد بازی",
    persian: "فارسی",
    english: "انگلیسی",
    colorPalette: "پالت رنگ",
    language: "زبان",
    rockPaperScissors: "سنگ کاغذ قیچی",
    score: "امتیاز",
    makeYourChoice: "انتخاب خود را انجام دهید",
    gameHistory: "تاریخچه بازی",
    round: "دور",
    congratulations: "تبریک!",
    finalScore: "امتیاز نهایی",
    wins: "بردها",
    losses: "باخت‌ها",
    draws: "مساوی‌ها",
    playAgain: "بازی مجدد",
    selectGameMode: "انتخاب حالت بازی",
    resetGame: "شروع مجدد",
    gameOver: "بازی تمام شد",
    youWon: "شما برنده شدید!",
    youLost: "شما باختید!",
    itsATie: "مساوی شد!",
    player: "بازیکن",
    computer: "کامپیوتر",
    roundResult: "نتیجه دور",
    continue: "ادامه",
  },
} as const;

// Zustand store to manage the translation and language state
export const useTranslation = create<TranslationStore>()(
  persist(
    (set, get) => ({
      language: "en", // Default language is English
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: TranslationKeys) => translations[get().language][key] || key,
    }),
    {
      name: "language-storage", // Store the selected language in localStorage
    }
  )
);
