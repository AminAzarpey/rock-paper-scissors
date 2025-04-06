import { useEffect } from "react";
import { useThemeStore, useTranslation } from "./store";
import { Layout } from "./layout";
import { useGameStore } from "./store/gameStore";
import {
  GameScene,
  GameHistory,
  RoundModal,
  WinnerModal,
  GameModeSelector,
} from "./components";

function App() {
  const { isDarkMode, toggleDarkMode, theme } = useThemeStore();
  const { language, t } = useTranslation();
  const {
    playerChoice,
    computerChoice,
    result,
    score,
    wins,
    losses,
    draws,
    history,
    isRoundModalOpen,
    isWinnerModalOpen,
    gameMode,
    setGameMode,
    setPlayerChoice,
    closeRoundModal,
    closeWinnerModal,
    resetGame,
    isGameStarted,
    isGameEnded,
  } = useGameStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  return (
    <Layout>
      {/* Game Status */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{t("rockPaperScissors")}</h1>
        <div className="text-2xl font-semibold">
          {t("score")}: {score}
        </div>
      </div>

      {/* Game Board and History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={language === "fa" ? "order-2" : ""}>
          <GameModeSelector
            selectedMode={gameMode}
            onModeChange={setGameMode}
            isGameStarted={isGameStarted}
            isGameEnded={isGameEnded}
          />
          <GameScene
            playerChoice={playerChoice}
            computerChoice={computerChoice}
            onModelClick={setPlayerChoice}
          />
        </div>
        <div className={language === "fa" ? "order-1" : ""}>
          {history.length > 0 && <GameHistory history={history} />}
        </div>
      </div>

      {/* Modals */}
      {isRoundModalOpen && (
        <RoundModal
          isOpen={isRoundModalOpen}
          onClose={closeRoundModal}
          playerChoice={playerChoice!}
          computerChoice={computerChoice!}
          result={result!}
        />
      )}
      {isWinnerModalOpen && (
        <WinnerModal
          isOpen={isWinnerModalOpen}
          onClose={closeWinnerModal}
          winner={score > 0 ? "player" : score < 0 ? "computer" : "tie"}
          score={Math.abs(score)}
        />
      )}
    </Layout>
  );
}

export default App;
