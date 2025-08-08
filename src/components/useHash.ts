// hooks/useHash.ts
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

export function useHash() {
  const [hash, setHash] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams(); // reacts to URL changes

  useEffect(() => {
    const currentHash = window.location.hash;
    setHash(currentHash || null);
  }, [pathname, searchParams]); // rerun on navigation or query change

  return hash;
}
