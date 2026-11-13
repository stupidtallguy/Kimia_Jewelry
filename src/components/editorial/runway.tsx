import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { categories, productHref, type Product } from "@/lib/products";
import { ActionLink, Eyebrow, Photo } from "../visual";
import { editorialProduct } from "./photography";

const runwayProducts = [7874, 7875, 7871, 7792, 7815, 7806].map(editorialProduct);

export function CollectionRunway({ products = runwayProducts, title = "از نزدیک‌تر، زیباتر", href = "/shop", descriptions = false }: {
  products?: Product[];
  title?: string;
  href?: string;
  descriptions?: boolean;
} = {}) {
  return (
    <section className="collection-runway" aria-labelledby="runway-title">
      <div className="runway-stage">
        <div className="shell runway-heading">
          <div>
            <Eyebrow>گالری کیمیا</Eyebrow>
            <h2 className="campaign-display" id="runway-title">{title}</h2>
          </div>
          <ActionLink href={href} variant="text">همهٔ زیورآلات</ActionLink>
        </div>
        <div className="runway-window">
          <ul className="runway-track">
            {products.map((product) => (
              <li className="runway-piece" key={product.id}>
                <Link href={productHref(product)}>
                  <div className="runway-image photo">
                    <Photo image={product.images[0]} sizes="(max-width: 700px) 75vw, (max-width: 960px) 44vw, 35vw" />
                  </div>
                  <div className="runway-label">
                    <div><p>{categories[product.category]}</p><h3>{product.nameFa}</h3></div>
                    <ArrowUpLeft size={19} strokeWidth={1.4} aria-hidden="true" />
                  </div>
                  {descriptions && <p className="v3-runway-description">{product.descriptionFa}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shell runway-footer" aria-hidden="true"><div className="runway-progress"><span /></div></div>
      </div>
    </section>
  );
}
