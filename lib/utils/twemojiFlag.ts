const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

/** Regional-indicator pair (e.g. 🇦🇪) → Twemoji SVG filename. */
export function getTwemojiFlagSrc(flag: string): string | null {
  const trimmed = flag.trim();
  if (!trimmed) return null;

  const codePoints = [...trimmed]
    .map((ch) => ch.codePointAt(0))
    .filter((cp): cp is number => cp !== undefined && cp !== 0xfe0f);

  if (codePoints.length < 2) return null;

  const hex = codePoints.map((cp) => cp.toString(16)).join("-");
  return `${TWEMOJI_BASE}/${hex}.svg`;
}
