'use server';

// import { fetchGlobalSearch } from '@/lib/search/fetchGlobalSearch';

export async function searchAction(formData: FormData) {
  const query = formData.get('query')?.toString().trim() ?? '';
  if (!query) return null;

  try {
    const results = await fetchGlobalSearch(query);
    return results;
  } catch (err) {
    console.error('Search failed:', err);
    return { error: 'Search failed.' };
  }
}

// lib/search/fetchGlobalSearch.ts
export async function fetchGlobalSearch(query: string) {
  const password = process.env.GLOBAL_SEARCH;
  const auth = process.env.NEXT_PUBLIC_AUTH;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = `${apiUrl}/global-search?p=${password}&searchTerm=${encodeURIComponent(query)}&limit=10`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth ?? '',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`Search failed: ${res.statusText}`);
  }

  return res.json();
}
