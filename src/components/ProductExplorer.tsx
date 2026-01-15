"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Product } from "@/types/product";
import { useFavorites } from "./FavoritesContext";
import { ProductCard } from "./ProductCard";
import { CategorySelect } from "./CategorySelect";

const PAGE_SIZE = 8;
const API_URL = "https://fakestoreapi.com/products";

export function ProductExplorer() {
  const { favorites, isFavorite } = useFavorites();

  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- CLIENT FETCH (FIXES 403) ---------------- */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- HYDRATION SAFETY ---------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- DERIVED DATA ---------------- */
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ? true : product.category === category;

      const matchesFavorite = showFavoritesOnly
        ? favorites.has(product.id)
        : true;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [products, search, category, showFavoritesOnly, favorites]);

  const visibleProducts = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  /* ---------------- INFINITE SCROLL ---------------- */
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((current) =>
          current >= filtered.length ? current : current + PAGE_SIZE,
        );
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filtered.length]);

  /* ---------------- LOADING STATES ---------------- */
  if (!mounted || loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
        Loading products…
      </div>
    );
  }

  const hasMore = visibleProducts.length < filtered.length;

  /* ---------------- UI ---------------- */
  return (
    <section className="mx-auto flex container px-4 md:px-0 flex-1 flex-col gap-6 py-8 sm:py-10 lg:py-12">
      <header className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Product Explorer Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Browse products, search, filter by category, and manage your
            favorites. Infinite scroll loads more as you explore.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
          <div className="flex-1">
            <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Search
            </label>
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search by product title..."
              className="mt-1 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1">
              <CategorySelect
                label="Category"
                value={category}
                options={categories}
                onChange={(next) => {
                  setCategory(next);
                  setVisibleCount(PAGE_SIZE);
                }}
              />
            </div>

            <label className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => {
                  setShowFavoritesOnly(e.target.checked);
                  setVisibleCount(PAGE_SIZE);
                }}
              />
              <span>Show favorites only</span>
            </label>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center text-sm text-zinc-400">
            No products match your filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFavorite(product.id)}
                />
              ))}
            </div>

            <div ref={loadMoreRef} className="flex justify-center py-6">
              {hasMore ? (
                <p className="text-sm text-zinc-400">
                  Loading more products…
                </p>
              ) : (
                <p className="text-xs text-zinc-400">
                  You&apos;ve reached the end.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </section>
  );
}
