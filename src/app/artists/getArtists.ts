// app/album/[username]/getAlbum.ts
'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { Artist } from '@/types/artist';

export const getArtist = cache(async () => {
  const password = process.env.NEXT_PUBLIC_GET_ARTIST;
  const body = JSON.stringify({
    "columnName": "",
    "columnValue": "",
    "action": "fetchMore",
    "previouslyFetched": [],
    "sortBy": "totalPlays",
    "sortOrder": "desc"
  });

  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-artists?p=${password}&&all=true&&limit=20`;

  const { data, error, success } = await fetchWithState<Artist[]>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}`
    },
    body,
  });

  if (!success || !data || data.length === 0) {
    return { artists: null, error };
  }

  return {
    artists: data,
    error: null,
  };
});
