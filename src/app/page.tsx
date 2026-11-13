import { EditorialHero } from "@/components/hero";
import { ScrollShowcase } from "@/components/scroll-showcase";
import { BrandManifesto, FinalBrandCTA } from "@/components/editorial/brand";
import { CollectionFeatures } from "@/components/editorial/collections";
import { EditorialProductGallery } from "@/components/editorial/gallery";
import { EditorialMotion } from "@/components/editorial/motion";
import { CollectionRunway } from "@/components/editorial/runway";
import { PricingStory } from "@/components/editorial/pricing-story";
import { showcaseProducts } from "@/lib/products";
import "./editorial.css";

export default function Home() {
  return (
    <EditorialMotion>
      <EditorialHero />
      <BrandManifesto />
      <ScrollShowcase products={showcaseProducts} />
      <CollectionRunway />
      <CollectionFeatures />
      <PricingStory />
      <EditorialProductGallery />
      <FinalBrandCTA />
    </EditorialMotion>
  );
}
