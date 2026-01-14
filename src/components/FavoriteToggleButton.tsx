"use client";

import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useFavorites } from "./FavoritesContext";

interface FavoriteToggleButtonProps {
  productId: number;
  isFavorite: boolean;
}

export function FavoriteToggleButton({
  productId,
  isFavorite,
}: FavoriteToggleButtonProps) {
  const { toggleFavorite } = useFavorites();

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-zinc-100 text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-red-500 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-red-400 flex-shrink-0"
    >
      <span aria-hidden="true">
        {isFavorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
      </span>
    </button>
  );
}

