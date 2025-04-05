
import { useThemeStore } from "@rockPaperScissors/store";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeControls = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {isDarkMode ? (
        <FiSun className="w-6 h-6 text-gray-800 dark:text-white" />
      ) : (
        <FiMoon className="w-6 h-6 text-gray-800 dark:text-white" />
      )}
    </button>
  );
};

export default ThemeControls;
