// components/PageContext.tsx

'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Define the type for your context value
interface PageContextType {
  pageId: string;
  urlChanged: boolean;
}

// Create the context with a default value
const PageContext = createContext<PageContextType | undefined>(undefined);

// Define the mapping type
type PageIdMap = { [key: string]: string };

// Define the provider props
interface PageProviderProps {
  children: ReactNode;
}

// Define the provider component
export function PageProvider({ children }: PageProviderProps) {
  const pathname = usePathname(); // Detect route changes
  const [urlChanged, setUrlChanged] = useState(false);

  const pageIdMap: PageIdMap = {
    "/": "home",
    "/about": "about",
    "/artists": "artists",
    "/discover": "discover",
    "/search": "search",
    "/artist": "artist",
    "/album": "album",
  };

  const pageId = pageIdMap[pathname] || "404";

  // 🔄 Detect full URL change (pathname or hash)
  useEffect(() => {
    const handleChange = () => {
      setUrlChanged(true);
      // Auto-reset after a short time if you want it to be a pulse flag
      setTimeout(() => setUrlChanged(false), 100);
    };

    window.addEventListener('hashchange', handleChange);
    window.addEventListener('popstate', handleChange);

    // Initial run (for first load)
    handleChange();

    return () => {
      window.removeEventListener('hashchange', handleChange);
      window.removeEventListener('popstate', handleChange);
    };
  }, [pathname]);

  return (
    <PageContext.Provider value={{ pageId, urlChanged }}>
      {children}
    </PageContext.Provider>
  );
}

// Custom hook to access page context
export default function usePage(): PageContextType {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
}
