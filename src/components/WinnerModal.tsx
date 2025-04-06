import { useTranslation } from "@rockPaperScissors/store";
import { motion } from "framer-motion";
import { useGameStore } from "@rockPaperScissors/store";

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: "player" | "computer" | "tie";
  score: number;
}

export const WinnerModal = ({
  isOpen,
  onClose,
  winner,
  score,
}: WinnerModalProps) => {
  const { t } = useTranslation();
  const { resetGame } = useGameStore();

  if (!isOpen) return null;

  const getWinnerEmoji = () => {
    switch (winner) {
      case "player":
        return "🎉";
      case "computer":
        return "😢";
      case "tie":
        return "🤝";
    }
  };

  const getWinnerColor = () => {
    switch (winner) {
      case "player":
        return "text-green-500";
      case "computer":
        return "text-red-500";
      case "tie":
        return "text-yellow-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-primary/20 dark:bg-neutral/20 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-primary/10 dark:border-neutral/10"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-8xl mb-4"
          >
            {getWinnerEmoji()}
          </motion.div>
          <h2 className={`text-3xl font-bold mb-2 ${getWinnerColor()}`}>
            {t(
              winner === "player"
                ? "youWon"
                : winner === "computer"
                ? "youLost"
                : "itsATie"
            )}
          </h2>
          <p className="text-lg text-primary dark:text-primary-light">
            {t("finalScore")}: {score}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors shadow-lg"
            onClick={resetGame}
          >
            {t("playAgain")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-primary/10 hover:bg-primary/20 dark:bg-neutral/10 dark:hover:bg-neutral/20 text-primary dark:text-primary-light rounded-xl font-medium transition-colors"
            onClick={onClose}
          >
            {t("close")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
