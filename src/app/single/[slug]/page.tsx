// app/single/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getSingle } from './getSingle';
import type { Metadata } from 'next';
import SingleDetailsView from './SingleDetailsView';
import DateUtil from '@/utils/dateUtil';

// 🧠 REVALIDATE (ISR): Regenerates the page every 60 seconds
export const revalidate = 60;

// ✅ SEO Metadata (dynamic)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { single } = await getSingle(slug);

  if (!single) {
    return {
      title: 'Single Not Found',
      description: "Sorry, we couldn't find this Single",
      metadataBase: new URL(process.env.SITE_URL ?? ""),
    };
  }

  const title = `${single.title} by ${single.artistDetails.artistName} on Soundlytude`;
  const description = `Single • ${DateUtil.getYear(single.releaseDate)} • ${single.description}`;
  const art = single.coverArt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: single.coverArt, // full URL
          width: 1028,
          height: 1028,
          alt: art,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [art],
    },
    // Optional, only if using relative image URLs:
    // metadataBase: new URL(process.env.SITE_URL ?? ""),
  };
}

// ✅ Actual Page Component
export default async function SinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unwrap the params promise
  const { slug } = await params;

  const { single, error } = await getSingle(slug);

  if (!single) {
    console.warn('[singlePage] Error:', error);
    return notFound();
  }

  return <main>
    <SingleDetailsView single={single}/>
  </main>

}
