// getTracks.ts
'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { AlbumSingle } from '@/types/albumSingle';
import { getArtist } from './getArtist';

export const getMusic = cache(async (username: string) => {
  const password = process.env.NEXT_PUBLIC_GET_ALBUM_SINGLE;

  const { artist } = await getArtist(username);

   if (!artist) {
    return { music: null, error: 'Invalid username' };
  }

  const body = JSON.stringify({ 
    "columnName": "artistDetails", 
    "columnValue": [artist?._id], 
    "action": "fetchMore", 
    "previouslyFetched": [] });
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-album-single?p=${password}&&all=false&&limit=10000`;

  const { data, error, success } = await fetchWithState<AlbumSingle[]>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}` },
    body,
  });

  if (!success || !data || data.length === 0) {
    return { music: null, error };
  }

  return {
    music: data,
    musicError: null,
  };
});
