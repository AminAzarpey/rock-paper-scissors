import {useEffect} from "react";
import {useThemeStore, useTranslation} from "./store";
import {Layout} from "./layout";
import {useGameStore} from "./store/gameStore";
import {GameHistory, GameModeSelector, GameScene, RoundModal, WinnerModal,} from "./components";

function App() {
    const {isDarkMode} = useThemeStore();
    const {t} = useTranslation();
    const {
        playerChoice,
        computerChoice,
        result,
        score,
        history,
        isRoundModalOpen,
        isWinnerModalOpen,
        gameMode,
        setGameMode,
        setPlayerChoice,
        closeRoundModal,
        closeWinnerModal,
        isGameStarted,
        isGameEnded,
    } = useGameStore();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const getWinner = () => {
        if (score > 0) return "player";
        if (score < 0) return "computer";
        return "tie";
    };

    return (
        <Layout>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">{t("rockPaperScissors")}</h1>
                <div className="text-2xl font-semibold">
                    {t("score")}: {score}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
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
                <div>
                    <GameHistory history={history}/>
                </div>
            </div>

            {!isGameEnded && isRoundModalOpen && playerChoice && computerChoice && result && (
                <RoundModal
                    isOpen={isRoundModalOpen}
                    onClose={closeRoundModal}
                    playerChoice={playerChoice}
                    computerChoice={computerChoice}
                    result={result}
                />
            )}

            {isGameEnded && isWinnerModalOpen && (
                <WinnerModal
                    isOpen={isWinnerModalOpen}
                    onClose={closeWinnerModal}
                    winner={getWinner()}
                    score={Math.abs(score)}
                />
            )}
        </Layout>
    );
}

export default App;
