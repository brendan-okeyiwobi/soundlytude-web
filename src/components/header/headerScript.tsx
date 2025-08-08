'use client';

import { useState, useEffect } from "react";

export default function useHeaderScript(pageId: string) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [prevPageId, setPrevPageId] = useState<string | null>(null); // Track previous page ID

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        if (newState) {
          document.querySelectorAll<HTMLElement>(".link").forEach(() => {
            // el.classList.remove("unscrolled");
          });
          document.getElementById("header")?.classList.add("open");
        } else {
          document.getElementById("header")?.classList.remove("open");
        }
      }
      return newState;
    });
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const texts = document.querySelectorAll<HTMLElement>(".link");
      const elements = document.querySelectorAll<HTMLElement>(".bar");

      texts.forEach((el) => {
        if (window.scrollY > 675) {
          el.classList.remove("unscrolled");
        } else {
          el.classList.add("unscrolled");
        }
      });

      elements.forEach((el) => {
        if (window.scrollY > 600) {
          el.classList.remove("unscrolledE");
        } else {
          el.classList.add("unscrolledE");
        }
      });
    }
  };
  useEffect(() => {
    const scrollToggle = () => {
      if (menuOpen) {
        toggleMenu();
      }
    };
  
    if (pageId !== prevPageId) {
      scrollToggle();
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      setPrevPageId(pageId);
    }
  
    if (typeof window !== "undefined") {
      if (pageId === "home") {
        const handleScrollAndToggle = () => {
          handleScroll();
          scrollToggle();
        };
  
        handleScroll(); // Initial scroll styling
  
        window.addEventListener("scroll", handleScrollAndToggle);
        return () => {
          window.removeEventListener("scroll", handleScrollAndToggle);
        };
      } else {
        const handleScrollForOtherPages = () => {
          if (menuOpen) {
            toggleMenu();
          }
        };
  
        document.querySelectorAll<HTMLElement>(".link").forEach((el) => {
          el.classList.remove("unscrolled");
        });
  
        window.addEventListener("scroll", handleScrollForOtherPages);
        return () => {
          window.removeEventListener("scroll", handleScrollForOtherPages);
        };
      }
    }
  }, [pageId, menuOpen, prevPageId]); // No need for scrollToggle anymore
  

  return { menuOpen, toggleMenu };
}
