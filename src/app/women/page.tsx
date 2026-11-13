import { CollectionPage } from "@/components/collection-page";
import { collections } from "@/lib/collections";

export const metadata = { title: collections.women.title, description: collections.women.description };

export default async function WomenPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  return <CollectionPage gender="women" category={(await searchParams).category} />;
}
