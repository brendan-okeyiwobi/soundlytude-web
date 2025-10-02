// app/artist/[username]/page.tsx

import { notFound } from 'next/navigation';
import { getArtist } from './getArtist';
import ArtistDetailsView from './artistView';
import type { Metadata } from 'next';
import { getMusic } from './getMusic';
import { resolveContentURL } from '@/utils/resolveContentURL';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const { artist } = await getArtist(username);

  if (!artist) {
    return {
      title: 'Artist Not Found',
      description: "Sorry, we couldn't find this Artist.",
      metadataBase: new URL(process.env.SITE_URL ?? ""),
    };
  }

  const title = `${artist.artistName} on Soundlytude`;
  let description = `${artist.bio}. ${artist.about}`;
  if (description.length > 160) {
    description = description.slice(0, 157) + '...';  // Leave space for ellipsis
  }
  const pfp = resolveContentURL(artist.profilePicture, "scaledToFill", { width: 256, height: 256 })

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: pfp, // full URL
          width: 1200,
          height: 600,
          alt: `${artist.artistName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [pfp],
    },
    other: {
      // 👇 This is the Smart App Banner
      "apple-itunes-app": `app-id=6503627263, app-argument=soundlytude://app/artist/${artist._id}`,
    }
    // Optional, only if using relative image URLs:
    // metadataBase: new URL(process.env.SITE_URL ?? ""),
  };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // unwrap the params promise
  const { username } = await params;

  const { artist, error } = await getArtist(username);

  const { music } = await getMusic(username);

  //   const { tracks, tracksError } = await getTracks(album?._id ?? BigInt("-1"));

  if (!artist) {
    console.warn('[artistPage] Error:', error);
    return notFound();
  }

  return <main>
    <ArtistDetailsView artist={artist} music={music ?? []} />
  </main>

}
