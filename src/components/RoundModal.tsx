import { useTranslation } from "@rockPaperScissors/store";
import { GameChoice, GameResult } from "@rockPaperScissors/types";
import { motion } from "framer-motion";

interface RoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: GameResult;
}

export const RoundModal = ({
  isOpen,
  onClose,
  playerChoice,
  computerChoice,
  result,
}: RoundModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const getEmoji = (choice: GameChoice) => {
    switch (choice) {
      case "rock":
        return "✊";
      case "paper":
        return "✋";
      case "scissors":
        return "✌️";
    }
  };

  const getResultColor = (result: GameResult) => {
    switch (result) {
      case "win":
        return "text-green-500";
      case "lose":
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
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-primary-light">
          {t("roundResult")}
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="text-7xl mb-4">{getEmoji(playerChoice)}</div>
            <p className="text-lg font-semibold text-primary dark:text-primary-light">
              {t("yourChoice")}
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-7xl mb-4">{getEmoji(computerChoice)}</div>
            <p className="text-lg font-semibold text-primary dark:text-primary-light">
              {t("computerChoice")}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-6"
        >
          <p className={`text-3xl font-bold ${getResultColor(result)}`}>
            {t(result)}
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors shadow-lg"
          onClick={onClose}
        >
          {t("continue")}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
