// app/album/[username]/getArtist.ts
'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { Artist } from '@/types/artist';

export const getArtist = cache(async (username: string) => {
  const password = process.env.NEXT_PUBLIC_GET_ARTIST;
  const body = JSON.stringify({ 
    "columnName": "username", 
    "columnValue": username, 
    "action": "fetchMore", 
    "previouslyFetched": [] });
    
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-artists?p=${password}&&all=false&&limit=1`;

  const { data, error, success } = await fetchWithState<Artist[]>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}` },
    body,
  });

  if (!success || !data || data.length === 0) {
    return { artist: null, error };
  }

  return {
    artist: data[0],
    error: null,
  };
});
