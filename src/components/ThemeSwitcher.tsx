"use client";

import { useEffect, useState } from "react";
import { LuSunDim, LuSunMoon } from "react-icons/lu";

type Theme = "light" | "dark";
const STORAGE_KEY = "product-explorer:theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    // Delay until after hydration is fully complete
    const id = requestAnimationFrame(() => {
      const root = document.documentElement;

      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      localStorage.setItem(STORAGE_KEY, theme);
    });

    return () => cancelAnimationFrame(id);
  }, [theme]);

  const isDark = theme === "dark";

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const x = e.clientX;
    const y = e.clientY;

    const reveal = document.createElement("div");
    reveal.className = "theme-reveal";
    reveal.style.setProperty("--x", `${x}px`);
    reveal.style.setProperty("--y", `${y}px`);

    document.body.appendChild(reveal);

    setTheme(isDark ? "light" : "dark");

    setTimeout(() => {
      reveal.remove();
    }, 500);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full
                 border border-zinc-200 bg-white text-zinc-600 shadow-sm
                 transition-all duration-300 ease-in-out
                 hover:scale-105 active:scale-95
                 hover:border-zinc-300 hover:bg-zinc-50
                 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200
                 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
    >
      <span className="text-lg">
        {isDark ? <LuSunDim size={20} /> : <LuSunMoon size={20} />}
      </span>
    </button>
  );
}
