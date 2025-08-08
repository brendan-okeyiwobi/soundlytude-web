// components/Header.tsx
'use client';

import usePage from "@/components/PageContext";
import HeaderShell from './HeaderShell';

export default function Header() {
  const { pageId } = usePage();

  return <HeaderShell pageId={pageId} />;
}