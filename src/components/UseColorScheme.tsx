'use client';

import { useEffect, useState } from 'react';

type ColorScheme = 'light' | 'dark';

function useColorScheme(): ColorScheme {
  const getCurrentScheme = (): ColorScheme =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const [scheme, setScheme] = useState<ColorScheme>(getCurrentScheme);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      setScheme(e.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return scheme;
}

export default useColorScheme;
