import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    // Cache on server for a short period; can be tuned as needed
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await res.json()) as Product[];

  // Basic runtime validation to guard against unexpected API changes
  if (!Array.isArray(data)) {
    throw new Error("Unexpected products response shape");
  }

  return data;
}

