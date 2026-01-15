import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Products API failed:", res.status);
      return [];
    }

    const data = (await res.json()) as Product[];

    console.log("Data : ", { data })
    console.log("Data 2 : ", data)

    // Basic runtime validation to guard against unexpected API changes
    if (!Array.isArray(data)) {
      console.error("Invalid products response");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Fetch products error:", error);
    return [];
  }
}

