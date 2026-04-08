"use client";

import * as React from "react";
import { SmokeCurtainSVG } from "./svg/SmokeCurtainSVG";

export function SmokeCurtain() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9998,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
      role="presentation"
    >
      <SmokeCurtainSVG
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        preserveAspectRatio="xMidYMid slice"
      />
    </div>
  );
}

