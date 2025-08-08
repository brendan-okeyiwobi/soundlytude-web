// app/single/[slug]/head.tsx

import { getSingle } from './getSingle';


export default async function Head({
  params,
}: {
  params: { slug: string };
}) {
  const { single } = await getSingle(params.slug);

  if (!single) return null;

  return (
    <>
      <meta
        name="apple-itunes-app"
        content={`app-id=6503627263, app-argument=soundlytude://app/single/${single._id}`}
      />
    </>
  );
}
