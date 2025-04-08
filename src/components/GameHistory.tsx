import {useTranslation} from "@rockPaperScissors/store";
import {GameHistory as GameHistoryType, GameResult,} from "@rockPaperScissors/types";
import {motion} from "framer-motion";

interface GameHistoryProps {
    history: GameHistoryType[];
}

const getResultEmoji = (result: GameResult): string => {
    switch (result) {
        case "win":
            return "🎉";
        case "lose":
            return "😢";
        case "tie":
            return "🤝";
    }
};

const getResultColor = (result: GameResult): string => {
    switch (result) {
        case "win":
            return "bg-green-500/10 dark:bg-green-500/20";
        case "lose":
            return "bg-red-500/10 dark:bg-red-500/20";
        case "tie":
            return "bg-yellow-500/10 dark:bg-yellow-500/20";
    }
};

const getResultTextColor = (result: GameResult): string => {
    switch (result) {
        case "win":
            return "text-green-500";
        case "lose":
            return "text-red-500";
        case "tie":
            return "text-yellow-500";
    }
};

export const GameHistory = ({history}: GameHistoryProps) => {
    const {t} = useTranslation();

    if (history.length === 0) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-primary/10 dark:border-neutral/10"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-primary-light">
                {t("gameHistory")}
            </h2>
            <div className="space-y-4">
                {history.map((round, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: index * 0.1}}
                        className={`p-4 rounded-xl ${getResultColor(round.result)}`}
                    >
                        <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-primary dark:text-primary-light">
                {t("round")} {index + 1}
              </span>
                            <span className="text-2xl">{getResultEmoji(round.result)}</span>
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                <span className="text-primary/80 dark:text-primary-light/80">
                  {t("player")}:
                </span>
                                <span className="font-medium text-primary dark:text-primary-light">
                  {t(round.playerChoice)}
                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                <span className="text-primary/80 dark:text-primary-light/80">
                  {t("computer")}:
                </span>
                                <span className="font-medium text-primary dark:text-primary-light">
                  {t(round.computerChoice)}
                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                <span className="text-primary/80 dark:text-primary-light/80">
                  {t("result")}:
                </span>
                                <span
                                    className={`font-medium ${getResultTextColor(round.result)}`}
                                >
                  {t(round.result)}
                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
