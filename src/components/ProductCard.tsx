import Image from "next/image";
import { Product } from "@/types/product";
import { FavoriteToggleButton } from "./FavoriteToggleButton";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
}

export function ProductCard({ product, isFavorite }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <a
        href={`/products/${product.id}`}
        className="relative block aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950"
        aria-label={product.title}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </a>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {product.category}
            </p>
            <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {product.title}
            </h2>
          </div>
          <FavoriteToggleButton productId={product.id} isFavorite={isFavorite} />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </p>
          {product.rating && (
            <p className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <span aria-hidden="true">★</span>
              <span>{product.rating.rate.toFixed(1)}</span>
              <span className="text-[10px]">({product.rating.count})</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

