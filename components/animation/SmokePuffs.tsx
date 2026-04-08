"use client";

import { SmokePuffsSVG } from "./svg/SmokePuffsSVG";

export function SmokePuffs() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "55%",
        width: "clamp(500px, 100vw, 1000px)",
        height: "clamp(220px, 45vw, 500px)",
        transform: "translate(-50%, -50%)",
        zIndex: 9997,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <SmokePuffsSVG style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
