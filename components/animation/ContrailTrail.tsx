"use client";

import * as React from "react";
import { ContrailSVG } from "./svg/ContrailSVG";

export function ContrailTrail() {
  const pathRef = React.useRef<SVGPathElement | null>(null);

  React.useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;
  }, []);

  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 9996,
        pointerEvents: "none",
        transform: "translateZ(0)",
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
      role="presentation"
    >
      <ContrailSVG
        pathRef={pathRef}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      />
    </div>
  );
}

