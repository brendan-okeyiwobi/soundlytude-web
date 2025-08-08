// app/artists/page.tsx

import { notFound } from 'next/navigation';
import { getArtist } from './getArtists';
import ArtistsView from './artistsView';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const { artists } = await getArtist();

    if (!artists) {
        return {
            title: 'No Artists',
            description: "Sorry, we couldn't find these Artist.",
            metadataBase: new URL(process.env.SITE_URL ?? ""),
        };
    }

    const artistNames = [];
    artistNames.push(...artists.map(artist => artist._id));
    const title = `Artists on Soundlytude`;
    const description = `${artists.join(", ")} on Soundlytude`;

    return {
        title,
        description,
        openGraph: {
            title,
            description
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description
        },
        // Optional, only if using relative image URLs:
        // metadataBase: new URL(process.env.SITE_URL ?? ""),
    };
}

export default async function ArtistsPage() {
    const { artists, error } = await getArtist();

    if (!artists) {
        console.warn('[artistPage] Error:', error);
        return notFound();
    }

    return <main>
        <ArtistsView artists={artists} />
    </main>

}
