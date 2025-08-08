// app/single/[slug]/getSingle.ts

'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { Single } from '@/types/single';

export const getSingle = cache(async (slug: string) => {
  const password = process.env.NEXT_PUBLIC_GET_SINGLES;
  const body = JSON.stringify({ 
    "columnName": "slug", 
    "columnValue": slug, 
    "action": "fetchMore", 
    "previouslyFetched": [] });
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-singles?p=${password}&&all=false&&limit=1`;

  const { data, error, success } = await fetchWithState<Single[]>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}` },
    body,
  });

  if (!success || !data || data.length === 0) {
    return { single: null, error };
  }

  return {
    single: data[0],
    error: null,
  };
});
