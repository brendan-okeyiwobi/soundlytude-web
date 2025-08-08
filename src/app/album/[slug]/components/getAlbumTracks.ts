// getTracks.ts
'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { Track } from '@/types/track';

export const getTracks = cache(async (albumId: bigint) => {
  const password = process.env.NEXT_PUBLIC_GET_TRACKS;

   if (!albumId || albumId == BigInt("-1")) {
    return { tracks: null, error: 'Invalid albumId' };
  }

  const body = JSON.stringify({ 
    "columnName": "albumDetails", 
    "columnValue": albumId, 
    "action": "fetchMore", 
    "previouslyFetched": [] });
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-tracks?p=${password}&&all=false&&limit=10000`;

  const { data, error, success } = await fetchWithState<Track[]>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}` },
    body,
  });

  if (!success || !data || data.length === 0) {
    return { tracks: null, error };
  }

  return {
    tracks: data,
    tracksError: null,
  };
});
