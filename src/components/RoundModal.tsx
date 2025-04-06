import { useTranslation } from "../store";
import { GameChoice, GameResult } from "../types/game";
import { getResultMessage } from "../utils/game";
import { motion, AnimatePresence } from "framer-motion";

interface RoundModalProps {
  result: GameResult;
  playerChoice: GameChoice | null;
  computerChoice: GameChoice | null;
  onClose: () => void;
}

const RoundModal = ({
  result,
  playerChoice,
  computerChoice,
  onClose,
}: RoundModalProps) => {
  const { language, t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative bg-black/70 p-8 rounded-lg text-white text-center space-y-6 backdrop-blur-sm"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold"
          >
            {getResultMessage(result, language)}
          </motion.h2>
          <div className="flex justify-center space-x-8">
            {playerChoice && (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="mb-4 text-xl">{t("yourChoice")}</p>
                <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center text-2xl font-bold">
                  {t(playerChoice)}
                </div>
              </motion.div>
            )}
            {computerChoice && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <p className="mb-4 text-xl">{t("computerChoice")}</p>
                <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center text-2xl font-bold">
                  {t(computerChoice)}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RoundModal;
