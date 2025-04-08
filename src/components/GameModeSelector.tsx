import {useTranslation} from "@rockPaperScissors/store";
import {GameMode} from "@rockPaperScissors/types";
import {motion} from "framer-motion";

interface GameModeSelectorProps {
    selectedMode: GameMode;
    onModeChange: (mode: GameMode) => void;
    isGameStarted: boolean;
    isGameEnded: boolean;
}

export const GameModeSelector = ({
                                     selectedMode,
                                     onModeChange,
                                     isGameStarted,
                                     isGameEnded,
                                 }: GameModeSelectorProps) => {
    const {t} = useTranslation();

    if (isGameStarted && !isGameEnded) return null;

    const modes: { value: GameMode; label: string }[] = [
        {value: "1round", label: t("oneRound")},
        {value: "3round", label: t("threeRounds")},
        {value: "5round", label: t("fiveRounds")},
        {value: "infinite", label: t("infinite")},
    ];

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4 text-center text-primary dark:text-primary-light">
                {t("selectGameMode")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {modes.map((mode) => (
                    <motion.button
                        key={mode.value}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className={`p-4 rounded-lg text-center transition-colors ${
                            selectedMode === mode.value
                                ? "bg-primary text-white"
                                : "bg-primary/10 dark:bg-neutral/10 text-primary dark:text-primary-light"
                        }`}
                        onClick={() => onModeChange(mode.value)}
                    >
                        {mode.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};
