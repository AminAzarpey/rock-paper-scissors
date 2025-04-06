import { useTranslation } from "../store";

interface WinnerModalProps {
  score: number;
  wins: number;
  losses: number;
  draws: number;
  onClose: () => void;
}

const WinnerModal = ({
  score,
  wins,
  losses,
  draws,
  onClose,
}: WinnerModalProps) => {
  const { language, t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-black/70 p-8 rounded-lg text-white text-center space-y-6 backdrop-blur-sm">
        <h2 className="text-5xl font-bold text-yellow-400 animate-bounce">
          {language === "fa" ? "تبریک می‌گوییم!" : "Congratulations!"}
        </h2>
        <p className="text-2xl">
          {language === "fa" ? "شما برنده شدید!" : "You won the game!"}
        </p>
        <div className="space-y-4">
          <p className="text-xl">
            {t("score")}: {score}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-500/20 p-4 rounded-lg">
              <p className="text-green-400">{t("wins")}</p>
              <p className="text-2xl font-bold">{wins}</p>
            </div>
            <div className="bg-red-500/20 p-4 rounded-lg">
              <p className="text-red-400">{t("losses")}</p>
              <p className="text-2xl font-bold">{losses}</p>
            </div>
            <div className="bg-yellow-500/20 p-4 rounded-lg">
              <p className="text-yellow-400">{t("draws")}</p>
              <p className="text-2xl font-bold">{draws}</p>
            </div>
          </div>
        </div>
        <button
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-bold transition-colors"
          onClick={onClose}
        >
          {language === "fa" ? "بازی جدید" : "New Game"}
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
