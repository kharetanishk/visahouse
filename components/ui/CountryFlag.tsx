"use client";

import { getTwemojiFlagSrc } from "@/lib/utils/twemojiFlag";
import { cn } from "@/lib/utils";

interface CountryFlagProps {
  flag: string;
  size?: number;
  className?: string;
  alt?: string;
}

export function CountryFlag({
  flag,
  size = 20,
  className,
  alt = "Country flag",
}: CountryFlagProps) {
  const src = getTwemojiFlagSrc(flag);

  if (!src) {
    return (
      <span
        className={cn("inline-block leading-none", className)}
        style={{ fontSize: size }}
        aria-hidden
      >
        {flag}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
      loading="lazy"
      decoding="async"
    />
  );
}
