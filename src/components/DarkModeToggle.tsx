import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark");
  }, []);

  return (
    <button
      className="btn-secondary text-sm"
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
};

export default DarkModeToggle;
