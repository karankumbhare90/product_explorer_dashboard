"use client";

import { FavoriteToggleButton } from "@/components/FavoriteToggleButton";
import { useFavorites } from "@/components/FavoritesContext";

interface ProductFavoriteButtonProps {
  id: number;
}

export function ProductFavoriteButton({ id }: ProductFavoriteButtonProps) {
  const { isFavorite } = useFavorites();

  return <FavoriteToggleButton productId={id} isFavorite={isFavorite(id)} />;
}

