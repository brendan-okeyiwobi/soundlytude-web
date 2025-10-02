// app/album/[slug]/getAlbum.ts
'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { Album } from '@/types/album';

export const getAlbum = cache(async (slug: string) => {
  const password = process.env.NEXT_PUBLIC_GET_ALBUMS;
  const body = JSON.stringify({ 
    "columnName": "slug", 
    "columnValue": slug, 
    "action": "fetchMore", 
    "previouslyFetched": [] });
    
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-albums?p=${password}&&all=false&&limit=1`;

  // console.log("NEGRITA NIFF")

  const { data, error, success } = await fetchWithState<Album[]>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}` },
    body,
  });

  if (!success || !data || data.length === 0) {
    return { album: null, error };
  }

  return {
    album: data[0],
    error: null,
  };
});
