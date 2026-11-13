import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Gem } from "lucide-react";
import type { ReactNode } from "react";
import { categories, genders, productHref, type Product, type ProductImage } from "@/lib/products";
import { getPriceQuote, pricingLabels, toman } from "@/lib/pricing";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="کیمیا، خانه">
      <span className="brand-mark"><Gem size={20} strokeWidth={1.25} aria-hidden="true" /></span>
      <span>کیمیا</span>
    </Link>
  );
}

export function Photo({ image, sizes, preload = false, loading, className }: {
  image: ProductImage;
  sizes: string;
  preload?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
}) {
  return (
    <Image
      fill
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      preload={preload}
      loading={loading}
      quality={preload ? 85 : 75}
      className={className}
      style={{ objectPosition: image.position }}
    />
  );
}

export function ActionLink({ href, children, variant = "outline" }: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "solid" | "outline" | "text";
}) {
  return <Link className={"action action-" + variant} href={href}>{children}<ArrowLeft size={17} aria-hidden="true" /></Link>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function PriceDisplay({ product }: { product: Product }) {
  const quote = getPriceQuote(product);
  return quote.status === "sample"
    ? <span className="price"><bdi>{toman(quote.amountToman)}</bdi><small>قیمت نمونه</small></span>
    : <span className="price price-pending">در انتظار تأیید قیمت</span>;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={productHref(product)} className="product-link">
        <div className="product-photo photo">
          <Photo image={product.images[0]} sizes="(max-width: 599px) 48vw, (max-width: 899px) 32vw, 24vw" />
          <span className="card-arrow" aria-hidden="true"><ArrowLeft size={18} /></span>
        </div>
        <div className="product-copy">
          <p className="product-meta">{categories[product.category]} {genders[product.gender]} <span aria-hidden="true">·</span> {pricingLabels[product.pricingType]}</p>
          <h3>{product.nameFa}</h3>
          <PriceDisplay product={product} />
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

export function CategoryBanner({ title, description, image }: {
  title: string;
  description: string;
  image: ProductImage;
}) {
  return (
    <section className="category-banner">
      <div className="category-banner-copy">
        <Eyebrow>مجموعه‌های کیمیا</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="category-banner-photo photo"><Photo image={image} sizes="(max-width: 700px) 100vw, 50vw" preload /></div>
    </section>
  );
}
