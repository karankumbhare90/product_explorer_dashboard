export const dynamic = "force-dynamic";
import { fetchProducts } from "@/lib/api";
import { ProductExplorer } from "@/components/ProductExplorer";

export default async function Home() {
  const products = await fetchProducts();

  return <ProductExplorer products={products} />;
}

