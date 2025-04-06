import { useState, useEffect } from "react";
import GameScene from "./components/GameScene";
import useGameStore from "./store/gameStore";
import { useThemeStore, useTranslation } from "./store";
import { Layout } from "./layout";
import { getResultMessage } from "./utils/game";
import RoundModal from "./components/RoundModal";
import WinnerModal from "./components/WinnerModal";
import GameHistory from "./components/GameHistory";

const App = () => {
  const {
    result,
    score,
    wins,
    losses,
    draws,
    currentRound,
    history,
    playerChoice,
    computerChoice,
    resetGame,
  } = useGameStore();
  const { isDarkMode } = useThemeStore();
  const { language, t } = useTranslation();
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    if (result) {
      setShowRoundModal(true);
      setTimeout(() => {
        setShowRoundModal(false);
        if (score >= 10) {
          setShowWinnerModal(true);
        } else {
          resetGame();
        }
      }, 3000);
    }
  }, [result, score, resetGame]);

  return (
    <Layout>
      <div className="relative h-[calc(100vh-4rem)]">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/50 p-4 rounded-lg text-white backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-2">
              {t("score")}: {score}
            </h1>
            <div className="space-y-2">
              <p className="text-lg">
                {t("round")}: {currentRound}
              </p>
              <p className="text-green-400">
                {t("wins")}: {wins}
              </p>
              <p className="text-red-400">
                {t("losses")}: {losses}
              </p>
              <p className="text-yellow-400">
                {t("draws")}: {draws}
              </p>
            </div>
          </div>
        </div>

        <GameScene />

        {showRoundModal && result && (
          <RoundModal
            result={result}
            playerChoice={playerChoice}
            computerChoice={computerChoice}
            onClose={() => setShowRoundModal(false)}
          />
        )}

        {showWinnerModal && (
          <WinnerModal
            score={score}
            wins={wins}
            losses={losses}
            draws={draws}
            onClose={() => {
              setShowWinnerModal(false);
              resetGame();
            }}
          />
        )}

        <div className="absolute bottom-4 left-4 z-10">
          <GameHistory history={history} />
        </div>
      </div>
    </Layout>
  );
};

export default App;
