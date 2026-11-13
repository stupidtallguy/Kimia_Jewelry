import { ActionLink, Eyebrow, Photo, PriceDisplay } from "./visual";
import { categories, genders, productHref, type Product } from "@/lib/products";
import { faNumber, pricingLabels } from "@/lib/pricing";

const sceneNumber = (index: number) => faNumber(index + 1).padStart(2, "۰");

function StoryPanel({ product, index, length }: { product: Product; index: number; length: number }) {
  return (
    <article className="showcase-panel" data-scene={index}>
      <div className="showcase-image photo">
        <Photo image={product.images[0]} sizes="(max-width: 700px) 86vw, 52vw" />
      </div>
      <span className="showcase-frame" aria-hidden="true" />
      <div className="showcase-copy">
        <p className="showcase-index" aria-label={faNumber(index + 1) + " از " + faNumber(length)}>
          <span aria-hidden="true">{sceneNumber(index)} / {sceneNumber(length - 1)}</span>
        </p>
        <p className="showcase-category">{categories[product.category]} {genders[product.gender]}</p>
        <h3>{product.nameFa}</h3>
        <p className="showcase-description">{product.descriptionFa}</p>
        <div className="showcase-details">
          <div className="showcase-price"><span>{pricingLabels[product.pricingType]}</span><PriceDisplay product={product} /></div>
          <ActionLink href={productHref(product)} variant="text">مشاهده جزئیات</ActionLink>
        </div>
      </div>
    </article>
  );
}

export function ScrollShowcase({ products }: { products: Product[] }) {
  return (
    <section className="showcase" id="showcase" aria-labelledby="showcase-title">
      <div className="showcase-stage">
        <div className="showcase-wash" aria-hidden="true">
          {products.map((product, index) => <span key={product.id} data-tone={index} />)}
        </div>
        <div className="shell showcase-heading">
          <Eyebrow>چهار قطعه از کیمیا</Eyebrow>
          <h2 id="showcase-title" className="campaign-display">از نزدیک</h2>
        </div>
        <div className="showcase-controls shell" role="group" aria-label="انتخاب قطعهٔ منتخب">
          {products.map((product, index) => (
            <button type="button" key={product.id} data-story-jump={index} aria-label={product.nameFa}>
              {sceneNumber(index)}
            </button>
          ))}
          <span className="showcase-line" aria-hidden="true"><span /></span>
        </div>
        <div className="showcase-panels shell">
          {products.map((product, index) => <StoryPanel key={product.id} product={product} index={index} length={products.length} />)}
        </div>
      </div>
    </section>
  );
}
