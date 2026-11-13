import { collections } from "@/lib/collections";
import { inCollection, products } from "@/lib/products";
import { Catalog } from "./catalog";
import { Eyebrow } from "./visual";
import { collectionCampaign } from "./editorial/collection-content";
import { CampaignClosing, CampaignHero, CategoryFeatures, CollectionStudy } from "./editorial/collection-sections";
import { CollectionRunway } from "./editorial/runway";
import { InteriorMotion } from "./editorial/interior-motion";
import "@/app/interior.css";

export function CollectionPage({ gender, category }: { gender: "women" | "men"; category?: string }) {
  const campaign = collectionCampaign(gender);
  const collectionProducts = products.filter((product) => inCollection(product, gender));
  const initialCategory = collectionProducts.find((product) => product.category === category)?.category;
  const catalogHref = "/" + gender + "#collection-catalog";

  return (
    <InteriorMotion theme={gender}>
      <CampaignHero label={collections[gender].title} headline={campaign.headline} subtitle={campaign.subtitle}
        image={campaign.hero.images[0]} inset={campaign.inset.images[0]} href={catalogHref} action="دیدن مجموعه" />
      <CategoryFeatures items={campaign.categories} gender={gender} />
      <CollectionStudy title={campaign.storyHeading} products={campaign.story} />
      <CollectionRunway products={campaign.runway} title={campaign.runwayHeading} href={catalogHref} descriptions />
      <CampaignClosing title={campaign.closing} image={campaign.closingPhoto.images[0]} href={catalogHref} action="دیدن همهٔ قطعه‌ها" />
      <section className="v3-catalog" id="collection-catalog" aria-labelledby="collection-catalog-title">
        <div className="shell">
          <Eyebrow>{collections[gender].title}</Eyebrow>
          <h2 id="collection-catalog-title">همهٔ قطعه‌ها</h2>
        </div>
        <Catalog key={initialCategory} products={collectionProducts} showGender={false} initialCategory={initialCategory} />
      </section>
    </InteriorMotion>
  );
}
