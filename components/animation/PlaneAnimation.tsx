"use client";

import PlaneSVG from "./svg/PlaneSVG";

export function PlaneAnimation() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "clamp(320px, 80vw, 800px)",
        height: "clamp(320px, 80vw, 800px)",
        transform: "translate(-50%, -50%)",
        zIndex: 10000,
        pointerEvents: "none",
      }}
    >
      <div
        id="plane-wrapper"
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          willChange: "transform, opacity",
          filter: "drop-shadow(0 30px 80px rgba(92,61,30,0.55))",
        }}
      >
        <PlaneSVG style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
