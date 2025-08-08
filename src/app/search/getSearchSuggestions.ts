// app/search/getSearchSuggestions.ts

'use server';

import { cache } from 'react';
import { fetchWithState } from '@/utils/fetchWithState';
import { SearchSuggestion } from '@/types/searchSuggestion';

export const getSearchSuggestions = cache(async () => {
  const password = process.env.NEXT_PUBLIC_GET_SEARCH_SUGGESTION;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-search-suggestions?p=${password}&&limit=200`;

  const { data, error, success } = await fetchWithState<SearchSuggestion[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AUTH}`
    }
  });

  if (!success || !data || data.length === 0) {
    return { suggestions: null, error };
  }

  return {
    suggestions: data,
    error: null,
  };
});
