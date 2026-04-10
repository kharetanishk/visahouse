"use client";

interface CountryFlagProps {
  flag: string;
  size?: number;
}

export function CountryFlag({ flag, size = 20 }: CountryFlagProps) {
  const codePoints = [...flag]
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");

  const twemojiUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`;

  return (
    <img
      src={twemojiUrl}
      alt={flag}
      width={size}
      height={size}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "8px",
        flexShrink: 0,
      }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        if (target.nextSibling === null) {
          const span = document.createElement("span");
          span.textContent = `${flag} `;
          target.parentNode?.insertBefore(span, target);
        }
      }}
    />
  );
}
