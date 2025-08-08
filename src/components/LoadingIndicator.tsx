// components/LoadingIndicator.tsx

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/app/globals.css";

NProgress.configure({ showSpinner: false, minimum: 0.25 });

export default function LoadingIndicator() {
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState<string>(pathname);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Skip if modifier keys are used or middle-click (mouse button 1)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");

      // Making sure it's a real navigation link (not external, not anchor, not JS void)
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("soundlytude") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        !target.hasAttribute("download") &&
        target.getAttribute("target") !== "_blank"
      ) {
        if (href !== pathname) {
          NProgress.start();
        }
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  useEffect(() => {
    // Finish loading once path changes
    if (pathname !== previousPathname) {
      NProgress.done();
      setPreviousPathname(pathname);
    }
  }, [pathname, previousPathname]);

  return null;
}
