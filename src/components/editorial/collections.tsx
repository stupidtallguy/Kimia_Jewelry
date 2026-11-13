import { collections } from "@/lib/collections";
import { ActionLink, Eyebrow, Photo } from "../visual";

function CollectionFeature({ gender }: { gender: "women" | "men" }) {
  const collection = collections[gender];
  return (
    <article className="collection-feature" data-collection={gender}>
      <div className="collection-feature-media photo">
        <Photo image={collection.image} sizes="(max-width: 700px) 100vw, 50vw" />
      </div>
      <div className="collection-feature-copy">
        <h3 className="campaign-display"><span>دنیای</span><span>{gender === "women" ? "زنانه" : "مردانه"}</span></h3>
        <p>{collection.description}</p>
        <ActionLink href={"/" + gender} variant="text">مشاهده مجموعهٔ {gender === "women" ? "زنانه" : "مردانه"}</ActionLink>
      </div>
    </article>
  );
}

export function CollectionFeatures() {
  return (
    <section id="collections" className="collection-features" aria-labelledby="collection-title">
      <div className="shell collection-intro">
        <Eyebrow>کالکشن‌ها</Eyebrow>
        <h2 id="collection-title" className="campaign-display">به سبک خودت</h2>
      </div>
      <div className="collection-diptych">
        <CollectionFeature gender="women" />
        <CollectionFeature gender="men" />
      </div>
    </section>
  );
}
