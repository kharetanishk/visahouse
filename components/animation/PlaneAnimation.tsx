"use client";

import * as React from "react";
import PlaneSVG from "./svg/PlaneSVG";

export function PlaneAnimation() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: 10000,
        pointerEvents: "none",
        // Bigger on mobile, capped on desktop
        width: "min(110vw, 620px)",
        height: "min(110vw, 620px)",
        transform: "translate(-50%, -50%) translateZ(0)",
      }}
    >
      <div
        id="plane-wrapper"
        style={{
          width: "100%",
          height: "100%",
          opacity: 0, // prevent first-paint flash before sequence sets initial state
          willChange: "transform, opacity",
          filter: "drop-shadow(0 20px 60px rgba(92,61,30,0.5))",
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      >
        <PlaneSVG style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

