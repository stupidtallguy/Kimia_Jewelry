import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
import { Eyebrow } from "@/components/visual";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "همهٔ زیورآلات زنانه و مردانهٔ کیمیا را ببینید و براساس نوع قطعه و شیوهٔ قیمت‌گذاری جست‌وجو کنید.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ search?: string; pricing?: string }> }) {
  const query = await searchParams;
  const pricing = query.pricing === "live-gold" || query.pricing === "fixed" ? query.pricing : undefined;
  return (
    <>
      <div className="page-heading shell">
        <Eyebrow>گالری کیمیا</Eyebrow>
        <h1>همهٔ زیورآلات</h1>
      </div>
      <Catalog key={pricing} products={products} focusSearch={query.search === "1"} initialPricing={pricing} />
    </>
  );
}
