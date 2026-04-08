"use client";

import * as React from "react";

export function SmokePuffsSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 100"
      width="240"
      height="100"
      role="img"
      aria-label="Airplane smoke puffs"
      {...props}
    >
      {/*
        VisaHouse — Smoke Puffs SVG Asset
        3 puffs arranged in a trail (left = oldest/largest, right = freshest/smallest)

        IDs for Framer Motion:
          #smoke-puff-1  → smallest, freshest (rightmost, closest to engine)
          #smoke-puff-2  → medium, dispersing
          #smoke-puff-3  → largest, most dispersed (leftmost)
      */}

      <defs>
        <radialGradient id="puff-grad-1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FAF3E8" stopOpacity="1" />
          <stop offset="100%" stopColor="#EDD9B5" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="puff-grad-2" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#F5ECD7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8D5B0" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="puff-grad-3" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#F0E4C8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#DEC89E" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      <g
        id="smoke-puff-3"
        opacity="0.38"
        style={{
          opacity: 0,
          transform: "scale(0)",
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      >
        <path
          d="
            M 30 62
            C 18 60, 8 52, 10 42
            C 12 32, 22 28, 30 30
            C 28 20, 36 12, 46 14
            C 52 10, 60 12, 64 18
            C 72 12, 84 14, 86 24
            C 94 20, 102 26, 100 36
            C 108 38, 110 48, 104 54
            C 106 62, 100 68, 92 66
            C 90 74, 82 78, 74 74
            C 68 80, 58 80, 52 74
            C 44 80, 34 76, 30 68
            Z
          "
          fill="url(#puff-grad-3)"
          stroke="#C9A96E"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeLinejoin="round"
        />
      </g>

      <g
        id="smoke-puff-2"
        opacity="0.6"
        style={{
          opacity: 0,
          transform: "scale(0)",
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      >
        <path
          d="
            M 128 66
            C 118 64, 112 56, 114 48
            C 116 40, 124 36, 132 38
            C 130 30, 138 24, 146 26
            C 150 22, 158 24, 160 30
            C 166 26, 174 30, 172 38
            C 178 40, 180 50, 174 56
            C 176 62, 170 68, 164 66
            C 162 72, 154 74, 148 70
            C 142 74, 134 72, 130 68
            Z
          "
          fill="url(#puff-grad-2)"
          stroke="#C9A96E"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeLinejoin="round"
        />
      </g>

      <g
        id="smoke-puff-1"
        opacity="0.9"
        style={{
          opacity: 0,
          transform: "scale(0)",
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      >
        <path
          d="
            M 200 64
            C 194 62, 190 56, 192 50
            C 194 44, 200 42, 206 44
            C 204 38, 210 32, 216 34
            C 218 30, 224 30, 226 36
            C 230 32, 236 36, 234 42
            C 238 44, 238 52, 234 56
            C 236 62, 230 66, 226 64
            C 224 68, 218 70, 214 66
            C 210 70, 204 68, 200 64
            Z
          "
          fill="url(#puff-grad-1)"
          stroke="#C9A96E"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeLinejoin="round"
        />
        <ellipse cx="215" cy="48" rx="5" ry="3.5" fill="rgba(255,255,255,0.35)" />
      </g>
    </svg>
  );
}

