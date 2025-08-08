// app/album/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getAlbum } from './getAlbum';
import { getTracks } from './components/getAlbumTracks';
import type { Metadata } from 'next';
import AlbumDetailsView from './components/albumDetailsView';
import { TrackModal } from './components/trackModal';
import DateUtil from '@/utils/dateUtil';

// REVALIDATE (ISR): Regenerates the page every 60 seconds
export const revalidate = 60;

// SEO Metadata (dynamic)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { album } = await getAlbum(slug);

  if (!album) {
    return {
      title: 'Album Not Found',
      description: "Sorry, we couldn't find this Album content.",
      metadataBase: new URL(process.env.SITE_URL ?? ""),
    };
  }

  const title = `${album.title} by ${album.artistDetails.artistName} on Soundlytude`;
  const description = `Album • ${DateUtil.getYear(album.releaseDate)} • ${album.tracksCount} Song${album.tracksCount > 1 ? "s" : ""}`;
  const art = album.coverArt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: art, // full URL
          width: 1028,
          height: 1028,
          alt: `${album.title} Cover art`,
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

// Actual Page Component
export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unwrap the params promise
  const { slug } = await params;

  const { album, error } = await getAlbum(slug);

  const { tracks } = await getTracks(album?._id ?? BigInt("-1"));

  if (!album) {
    console.warn('[albumPage] Error:', error);
    return notFound();
  }

  return <main>
    <AlbumDetailsView album={album} tracks={tracks ?? []} />
  <TrackModal tracks={tracks ?? []} />
  </main>

}
