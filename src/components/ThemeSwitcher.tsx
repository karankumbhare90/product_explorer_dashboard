"use client";

import { useEffect, useState } from "react";
import { LuSunDim, LuSunMoon } from "react-icons/lu";

type Theme = "light" | "dark";
const STORAGE_KEY = "product-explorer:theme";

export function ThemeSwitcher() {
  // ✅ SAME value on server + client
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // ✅ Read browser-only APIs AFTER mount
  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    const initial =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initial);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  if (!mounted) {
    // ✅ Prevents hydration mismatch
    return <div className="h-10 w-10" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full
                 border border-zinc-200 bg-white text-zinc-600
                 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
    >
      {isDark ? <LuSunDim size={20} /> : <LuSunMoon size={20} />}
    </button>
  );
}
