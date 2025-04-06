import { useTranslation } from "../store/useTranslationStore";
import { GameHistory as GameHistoryType } from "../types/game";
import { getResultMessage } from "../utils/game";
import { motion, AnimatePresence } from "framer-motion";

interface GameHistoryProps {
  history: GameHistoryType[];
}

const GameHistory = ({ history = [] }: GameHistoryProps) => {
  const { t } = useTranslation();

  if (!history || history.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-2">{t("history")}</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-2 rounded ${
                item.result === "win"
                  ? "bg-green-100 dark:bg-green-900"
                  : item.result === "lose"
                  ? "bg-red-100 dark:bg-red-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>
                  {t("round")} {item.round}:
                </span>
                <span className="font-medium">
                  {t("yourChoice")} {item.player} vs {t("computerChoice")}{" "}
                  {item.computer}
                </span>
                <span
                  className={`font-bold ${
                    item.result === "win"
                      ? "text-green-600 dark:text-green-400"
                      : item.result === "lose"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {getResultMessage(item.result)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GameHistory;
