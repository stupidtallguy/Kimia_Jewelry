import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { categories, productHref } from "@/lib/products";
import { ActionLink, Eyebrow, Photo, PriceDisplay } from "../visual";
import { editorialProduct } from "./photography";

const spreads = [
  [7797, 7787, 7795],
  [7876, 7878],
];

export function EditorialProductGallery() {
  return (
    <section className="editorial-gallery" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="editorial-gallery-heading">
          <Eyebrow>گزیدهٔ کیمیا</Eyebrow>
          <h2 className="campaign-display" id="gallery-title">قطعه‌های منتخب</h2>
          <ActionLink href="/shop" variant="text">همهٔ زیورآلات</ActionLink>
        </div>
        <div className="gallery-spreads">
          {spreads.map((spread, row) => (
            <ul className="gallery-spread" data-spread={row % 2 ? "reverse" : "forward"} key={spread[0]}>
              {spread.map((id, index) => {
                const product = editorialProduct(id);
                return (
                  <li className="gallery-piece" key={id}>
                    <Link href={productHref(product)}>
                      <div className="gallery-piece-image photo" data-reveal={index === 0 ? "curtain" : "side"}>
                        <Photo image={product.images[0]} sizes={index === 0 ? "(max-width: 700px) 80vw, 46vw" : "(max-width: 700px) 43vw, 24vw"} />
                        <span className="gallery-piece-price"><PriceDisplay product={product} /></span>
                      </div>
                      <div className="gallery-piece-caption">
                        <div><p>{categories[product.category]}</p><h3>{product.nameFa}</h3></div>
                        <ArrowUpLeft size={20} strokeWidth={1.4} aria-hidden="true" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
