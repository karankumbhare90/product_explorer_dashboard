"use client";

import { useEffect, useRef, useState } from "react";

interface CategorySelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function CategorySelect({
  label,
  value,
  options,
  onChange,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !buttonRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selectedLabel =
    value === "all" ? "All categories" : value || "Select category";

  return (
    <div className="relative">
      <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-1 flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-sm text-zinc-900 shadow-sm outline-none ring-0 transition hover:border-zinc-300 hover:bg-white focus:border-zinc-400 focus:bg-transparent focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate capitalize">{selectedLabel}</span>
        <span
          className={`ml-2 text-xs text-zinc-500 transition-transform dark:text-zinc-400 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 text-sm shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          role="listbox"
        >
          {options.map((option) => {
            const labelText =
              option === "all" ? "All categories" : option || "Unknown";
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 capitalize ${
                  isSelected
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-700 dark:text-zinc-200"
                }`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <span className="truncate">{labelText}</span>
                {isSelected && (
                  <span
                    className="ml-2 text-xs text-zinc-500 dark:text-zinc-400"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

