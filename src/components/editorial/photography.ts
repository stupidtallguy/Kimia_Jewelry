import { products } from "@/lib/products";

export function editorialProduct(id: number) {
  const product = products.find((item) => item.id === String(id));
  if (!product) throw new Error("Unknown editorial product: " + id);
  return product;
}
