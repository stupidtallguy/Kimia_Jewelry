import { CollectionPage } from "@/components/collection-page";
import { collections } from "@/lib/collections";

export const metadata = { title: collections.men.title, description: collections.men.description };

export default async function MenPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  return <CollectionPage gender="men" category={(await searchParams).category} />;
}
