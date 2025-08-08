// app/search/page.tsx

import { getSearchSuggestions } from './getSearchSuggestions';
import SearchPageView from './searchPageView';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {

  const title = `Search Soundlytude`;
  const description = `Search`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    // Optional, only if using relative image URLs:
    // metadataBase: new URL(process.env.SITE_URL ?? ""),
  };
}

export default async function SearchPage() {
  const { suggestions } = await getSearchSuggestions();

//   const { tracks, tracksError } = await getTracks(album?._id ?? BigInt("-1"));


  return <main>
      <SearchPageView initialSuggestions={suggestions ?? []} />
  </main>

}
