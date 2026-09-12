import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 rounded-xl border border-base-300 bg-base-100 hover:bg-base-200 text-base-content transition duration-200 shadow-sm flex items-center justify-center cursor-pointer"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun
          size={18}
          className="text-amber-400 hover:rotate-45 transition-transform duration-300"
        />
      ) : (
        <Moon
          size={18}
          className="text-slate-600 dark:text-slate-300 hover:-rotate-12 transition-transform duration-300"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
