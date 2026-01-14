import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import { ProductFavoriteButton } from "@/components/ProductFavoriteButton";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = (await res.json()) as Product;
  if (!data || typeof data.id !== "number") {
    return null;
  }

  return data;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await fetchProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto flex container lg:max-w-5xl flex-1 flex-col gap-8 py-8 sm:py-10 lg:py-12 px-4 md:px-0">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1 text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back to products
      </Link>

      <div className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-[minmax(0,1.1fr),minmax(0,1.3fr)] md:p-8">
        <div className="relative flex items-center justify-center rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="h-auto w-full max-w-xs object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {product.category}
              </p>
              <h1 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                {product.title}
              </h1>
            </div>
            <ProductFavoriteButton id={product.id} />
          </div>

          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </p>

          {product.rating && (
            <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <span aria-hidden="true">★</span>
                <span>{product.rating.rate.toFixed(1)}</span>
              </span>
              <span className="text-xs text-zinc-400">
                ({product.rating.count} reviews)
              </span>
            </p>
          )}

          <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <h2 className="font-medium text-zinc-900 dark:text-zinc-50">
              Description
            </h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

