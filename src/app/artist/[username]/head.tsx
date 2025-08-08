// app/artist/[slug]/head.tsx

import { getArtist } from './getArtist';


export default async function Head({
  params,
}: {
  params: { slug: string };
}) {
  const { artist } = await getArtist(params.slug);

  if (!artist) return null;

  return (
    <>
      <meta
        name="apple-itunes-app"
        content={`app-id=6503627263, app-argument=soundlytude://app/artist/${artist._id}`}
      />
    </>
  );
}
