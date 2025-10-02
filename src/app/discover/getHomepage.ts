// app/discover/getHomepage.ts

'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { Homepage } from '@/types/homepage';

export const getHomepage = cache(async () => {
  const password = process.env.NEXT_PUBLIC_GET_HOMEPAGE;
    
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-homepage-data?p=${password}&&all=false&&limit=1`;

  const { data, error, success } = await fetchWithState<Homepage>(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}` }
  });

  // console.log(data)

  if (!success || !data || data.length === 0) {
    return { homepage: null, error };
  }

  return {
    homepage: data,
    error: null,
  };
});