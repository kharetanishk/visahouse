"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import twemoji from "@twemoji/api";

/**
 * Parses flag and other emoji in the live DOM into Twemoji SVGs (fixes Windows
 * missing native flag emoji). Runs after mount and on every App Router navigation.
 */
export function TwemojiBodyParser() {
  const pathname = usePathname();

  useEffect(() => {
    const parse = () => {
      twemoji.parse(document.body, { folder: "svg", ext: ".svg" });
    };
    parse();
    const id = requestAnimationFrame(() => parse());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
