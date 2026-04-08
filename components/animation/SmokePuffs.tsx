"use client";

import * as React from "react";
import { SmokePuffsSVG } from "./svg/SmokePuffsSVG";

export function SmokePuffs() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "600px",
        height: "300px",
        marginLeft: "-300px",
        marginTop: "100px",
        zIndex: 9997,
        pointerEvents: "none",
      }}
      aria-hidden="true"
      role="presentation"
    >
      <SmokePuffsSVG style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

