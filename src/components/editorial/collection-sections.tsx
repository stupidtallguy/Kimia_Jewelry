import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { categories, productHref, type Category, type Product, type ProductImage } from "@/lib/products";
import { ActionLink, Eyebrow, Photo, PriceDisplay } from "../visual";

export function CampaignHero({ label, headline, subtitle, image, inset, href, action }: {
  label: string; headline: string[]; subtitle: string; image: ProductImage;
  inset?: ProductImage; href: string; action: string;
}) {
  return (
    <section className="v3-hero" aria-labelledby="v3-title">
      <div className="v3-hero-image photo"><Photo image={image} sizes="(max-width: 700px) 100vw, 75vw" preload /></div>
      <div className="v3-hero-copy">
        <Eyebrow>{label}</Eyebrow>
        <h1 id="v3-title">{headline.map((line) => <span className="v3-line" key={line}><span>{line}</span></span>)}</h1>
        <p>{subtitle}</p>
        <ActionLink href={href} variant="gold">{action}</ActionLink>
      </div>
      {inset && <div className="v3-hero-inset photo"><Photo image={inset} sizes="(max-width: 700px) 32vw, 17vw" loading="eager" /></div>}
      <span className="v3-hero-rule" aria-hidden="true" />
    </section>
  );
}

export function CategoryFeatures({ items, gender }: {
  items: { category: Category; image: ProductImage; description: string }[]; gender: "women" | "men";
}) {
  return (
    <section className="shell v3-categories" aria-labelledby="v3-categories-title">
      <Eyebrow>کالکشن‌ها</Eyebrow>
      <h2 id="v3-categories-title">{gender === "women" ? "جزئیاتِ به‌یادماندنی" : "فرم‌های متمایز"}</h2>
      <div className="v3-category-grid">
        {items.map(({ category, image, description }) => (
          <Link className="v3-category" key={category} href={"/" + gender + "?category=" + category + "#collection-catalog"}>
            <div className="v3-category-image photo"><Photo image={image} sizes="(max-width: 700px) 85vw, 43vw" /></div>
            <div className="v3-category-copy">
              <div><h3>{categories[category]}</h3><p>{description}</p></div>
              <span className="v3-category-action">دیدن قطعه‌ها <ArrowUpLeft size={19} aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CollectionStudy({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="v3-study" aria-labelledby="v3-study-title">
      <div className="shell">
        <Eyebrow>از نزدیک</Eyebrow>
        <h2 id="v3-study-title">{title}</h2>
        <div className="v3-study-grid">
          {products.map((product) => (
            <article className="v3-study-piece" key={product.id}>
              <div className="v3-study-image photo"><Photo image={product.images[0]} sizes="(max-width: 700px) 90vw, 52vw" /></div>
              <div className="v3-study-copy">
                <h3>{product.nameFa}</h3>
                <p>{product.descriptionFa}</p>
                <PriceDisplay product={product} />
                <ActionLink href={productHref(product)} variant="text">دیدن جزئیات</ActionLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CampaignClosing({ title, image, href, action }: {
  title: string; image: ProductImage; href: string; action: string;
}) {
  return (
    <section className="v3-closing">
      <div className="v3-closing-photo photo"><Photo image={image} sizes="(max-width: 700px) 100vw, 55vw" /></div>
      <div className="v3-closing-copy">
        <h2>{title}</h2>
        <ActionLink href={href} variant="gold">{action}</ActionLink>
      </div>
    </section>
  );
}
