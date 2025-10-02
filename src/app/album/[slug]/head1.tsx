// app/album/[slug]/head.tsx

import { getAlbum } from './getAlbum';

// export default async function AlbumHead({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const { album } = await getAlbum(slug);

//   if (!album) {
//     return null
//   }

//   return (
//     <>
//       <meta
//         name="apple-itunes-app"
//         content={`app-id=6503627263, app-argument=soundlytude://app/album/${album._id}`}
//       />
//     </>
//   );
// }

export default async function Head({
  params,
}: {
  params: { slug: string };
}) {
  const { album } = await getAlbum(params.slug);
  if (!album) return null;
  return (
    <>
      <meta
        name="apple-itunes-app"
        content={`app-id=6503627263, app-argument=soundlytude://app/album/${album._id}`} key="smart-banner"
      />
    </>
  );
}