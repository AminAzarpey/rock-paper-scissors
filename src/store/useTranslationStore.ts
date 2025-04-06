import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define types for the language and translation keys
type Language = "en" | "fa";

type TranslationKeys = keyof typeof translations.en;

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
    yourChoice: "Your Choice",
    computerChoice: "Computer's Choice",
    result: "Result",
    win: "You win!",
    lose: "You lose!",
    tie: "It's a tie!",
    reset: "Restart Game",
    english: "English",
    persian: "Persian",
    colorPalette: "Color Palette",
    language: "Language",
    score: "Score",
    round: "Round",
    wins: "Wins",
    losses: "Losses",
    draws: "Draws",
    history: "History",
  },
  fa: {
    title: "سنگ کاغذ قیچی",
    welcomeMessage: "به بازی سنگ کاغذ قیچی خوش آمدید!",
    selectChoice: "انتخاب خود را انجام دهید",
    rock: "سنگ",
    paper: "کاغذ",
    scissors: "قیچی",
    yourChoice: "انتخاب شما",
    computerChoice: "انتخاب کامپیوتر",
    result: "نتیجه",
    win: "شما برنده شدید!",
    lose: "شما باختید!",
    tie: "مساوی شد!",
    reset: "شروع مجدد بازی",
    persian: "فارسی",
    english: "انگلیسی",
    colorPalette: "پالت رنگ",
    language: "زبان",
    score: "امتیاز",
    round: "راند",
    wins: "بردها",
    losses: "باخت‌ها",
    draws: "مساوی‌ها",
    history: "تاریخچه",
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
