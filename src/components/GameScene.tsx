import {useGameStore, useThemeStore, useTranslation} from "@rockPaperScissors/store";
import {GameChoice} from "@rockPaperScissors/types";
import {motion} from "framer-motion";

interface GameSceneProps {
    playerChoice: GameChoice | null;
    computerChoice: GameChoice | null;
    onModelClick: (choice: GameChoice) => void;
}

export const GameScene = ({
                              playerChoice,
                              computerChoice,
                              onModelClick,
                          }: GameSceneProps) => {
    const {t} = useTranslation();
    const {resetGame} = useGameStore();
    const {theme} = useThemeStore();

    const choices: { value: GameChoice; emoji: string }[] = [
        {value: "rock", emoji: "✊"},
        {value: "paper", emoji: "✋"},
        {value: "scissors", emoji: "✌️"},
    ];

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg mt-4"
        >
            <h2 className="text-2xl font-bold mb-4 text-center text-primary dark:text-primary-light">
                {t("makeYourChoice")}
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {choices.map((choice) => (
                    <motion.button
                        key={choice.value}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className={`p-4 rounded-lg text-4xl transition-colors ${
                            playerChoice === choice.value
                                ? "bg-primary text-white"
                                : "bg-primary/10 dark:bg-neutral/10 text-primary dark:text-primary-light"
                        }`}
                        onClick={() => onModelClick(choice.value)}
                    >
                        {choice.emoji}
                    </motion.button>
                ))}
            </div>
            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="w-full p-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors mt-4"
                onClick={resetGame}
            >
                {t("resetGame")}
            </motion.button>
            {playerChoice && computerChoice && (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="mt-6 text-center"
                >
                    <div className="text-xl font-semibold mb-2 text-primary dark:text-primary-light">
                        {t("computerChoice")}
                    </div>
                    <div className="text-6xl">
                        {computerChoice === "rock" && "✊"}
                        {computerChoice === "paper" && "✋"}
                        {computerChoice === "scissors" && "✌️"}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
