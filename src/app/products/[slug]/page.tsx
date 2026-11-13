import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/cart-ui";
import { Eyebrow, PriceDisplay, ProductGrid } from "@/components/visual";
import { categories, genders, products } from "@/lib/products";
import { faNumber, pricingLabels } from "@/lib/pricing";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: product.nameFa, description: product.descriptionFa } : { title: "محصول پیدا نشد" };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.id !== product.id)
    .map((item) => ({ item, relevance: Number(item.gender === product.gender) + Number(item.category === product.category) * 2 }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 4)
    .map(({ item }) => item);

  return (
    <div className="shell detail-page">
      <nav className="breadcrumbs" aria-label="مسیر صفحه">
        <Link href="/shop">فروشگاه</Link><ChevronLeft size={14} aria-hidden="true" />
        {product.gender !== "unisex" && <><Link href={"/" + product.gender}>{genders[product.gender]}</Link><ChevronLeft size={14} aria-hidden="true" /></>}
        <span aria-current="page">{product.nameFa}</span>
      </nav>
      <div className="detail-layout">
        <ProductGallery images={product.images} />
        <section className="detail-copy" aria-labelledby="product-name">
          <Eyebrow>{categories[product.category]} {genders[product.gender]}</Eyebrow>
          <h1 id="product-name">{product.nameFa}</h1>
          <p className="detail-description">{product.descriptionFa}</p>
          <dl className="specifications">
            <div><dt>نوع زیور</dt><dd>{categories[product.category]}</dd></div>
            <div><dt>مجموعه</dt><dd>{genders[product.gender]}</dd></div>
            <div><dt>شیوهٔ قیمت‌گذاری</dt><dd>{pricingLabels[product.pricingType]}</dd></div>
            {product.goldWeightGrams !== undefined && <div><dt>وزن طلا</dt><dd>{faNumber(product.goldWeightGrams)} گرم</dd></div>}
            {product.goldPurity && <div><dt>عیار طلا</dt><dd>{product.goldPurity}</dd></div>}
            {product.available !== undefined && <div><dt>وضعیت موجودی</dt><dd>{product.available ? "موجود" : "ناموجود"}</dd></div>}
          </dl>
          <div className="detail-price">
            <PriceDisplay product={product} />
            <p>{product.pricingType === "live-gold" ? "قیمت این قطعه پیش از خرید باید تأیید شود." : "این مبلغ برای نمایش روند خرید در نسخهٔ آزمایشی است."}</p>
          </div>
          <AddToCart product={product} />
        </section>
      </div>
      <section className="related" aria-labelledby="related-title">
        <div className="section-heading"><h2 id="related-title">قطعه‌های مشابه</h2></div>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
