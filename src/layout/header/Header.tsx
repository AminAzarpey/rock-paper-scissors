import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation , useThemeStore } from "@rockPaperScissors/store";

import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { baseColors, generateColorPalette } from "@rockPaperScissors/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();
  const { isDarkMode, toggleDarkMode, setTheme } = useThemeStore();




  const handleColorChange = (color: string) => {
    const theme = generateColorPalette(color);
    setTheme(theme);
  };

  return (
      <header
          className="w-full p-4 flex justify-between items-center shadow-md"
          style={{ backgroundColor: `rgba(var(--color-primary-rgb), 0.1)` }}
          dir={language === "fa" ? "rtl" : "ltr"}
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("welcomeMessage")}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
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

          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? (
                <HiX className="w-6 h-6 text-gray-800 dark:text-white" />
            ) : (
                <HiMenuAlt3 className="w-6 h-6 text-gray-800 dark:text-white" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50"
                  dir={language === "fa" ? "rtl" : "ltr"}
              >
                <div className="space-y-4">
                  {/* Game Mode */}

                  {/* Color Palette */}
                  <div className="space-y-2">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("colorPalette")}
                </span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(baseColors).map(([name, color]) => (
                          <button
                              key={name}
                              onClick={() => handleColorChange(color)}
                              className="w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                              style={{ backgroundColor: color }}
                              title={name}
                          />
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("language")}
                </span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as "en" | "fa")}
                        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                      <option value="en">{t("english")}</option>
                      <option value="fa">{t("persian")}</option>
                    </select>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
};

export default Header;
