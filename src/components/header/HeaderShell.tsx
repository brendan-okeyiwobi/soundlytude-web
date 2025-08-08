// components/HeaderShell.tsx

import Link from 'next/link';
import { VStack, HStack } from "@/components/stack-layout";
import BurgerMenu from './BurgerMenu';
import "./lytude-header-style.css";

export default function HeaderShell({ pageId }: { pageId: string }) {
  
  return (
    
    <header id="header" className="lytudeheader">
      <VStack align="center" justify="center" gap="0px">
        <Link href="/">
          <div className="logo" />
        </Link>

        <div style={{ fontFamily: 'Futura', width: "fit-content" }}>
          <nav className="bigNav">
            <HStack gap="0px">
              <HStack className="links" gap="50px">
                <Link href="/discover" className={`link ${pageId === "discover" ? "active" : ""}`} style={{ fontSize: "clamp(1rem, 2vw, 18px)" }}>Discover</Link>
                <Link href="/artists" className={`link ${pageId === "artists" ? "active" : ""}`} style={{ fontSize: "clamp(1rem, 2vw, 18px)" }}>Artists</Link>
                <Link href="/search" className={`link ${pageId === "search" ? "active" : ""}`} style={{ fontSize: "clamp(1rem, 2vw, 18px)" }}>Search</Link>
              </HStack>
            </HStack>
          </nav>

          {/* The interactive burger nav lives here */}
          <BurgerMenu pageId={pageId} />
        </div>
      </VStack>
    </header>
  );
}
