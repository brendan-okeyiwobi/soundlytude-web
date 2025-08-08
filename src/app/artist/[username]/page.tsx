// app/artist/[username]/page.tsx

import { notFound } from 'next/navigation';
import { getArtist } from './getArtist';
import ArtistDetailsView from './artistView';
import type { Metadata } from 'next';
import { getMusic } from './getMusic';

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
  const description = `${artist.bio}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: artist.profilePicture ?? "", // full URL
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
      images: [artist.profilePicture ?? ""],
    },
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
