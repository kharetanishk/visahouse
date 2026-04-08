"use client";

import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  pathRef?: React.Ref<SVGPathElement>;
};

export function ContrailSVG({ pathRef, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      {/*
        VisaHouse — Contrail / Flight Path Trail SVG

        IDs used for animation:
          #contrail-path
          #contrail-path-soft
          #sparkle-1 / 2 / 3
          #trail-dots
      */}

      <defs>
        <linearGradient
          id="trail-grad"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0" />
          <stop offset="30%" stopColor="#C9973A" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#C9973A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E8B84B" stopOpacity="0.3" />
        </linearGradient>

        <filter id="sparkle-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        id="contrail-path"
        ref={pathRef}
        d="M 720 920 C 700 750, 640 580, 560 420 C 480 260, 400 160, 280 60"
        fill="none"
        stroke="url(#trail-grad)"
        strokeWidth="2.5"
        strokeDasharray="8 10"
        strokeLinecap="round"
        opacity="0.65"
      />

      <path
        id="contrail-path-soft"
        d="M 730 920 C 710 750, 650 580, 570 420 C 490 260, 408 160, 288 60"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="1"
        strokeDasharray="3 14"
        strokeLinecap="round"
        opacity="0.3"
      />

      <g id="sparkle-1" transform="translate(620, 680)" opacity="0">
        <path
          d="M 0 -8 L 1.5 -1.5 L 8 0 L 1.5 1.5 L 0 8 L -1.5 1.5 L -8 0 L -1.5 -1.5 Z"
          fill="#C9973A"
          filter="url(#sparkle-glow)"
        />
        <circle cx="0" cy="0" r="1.5" fill="#E8B84B" />
      </g>

      <g id="sparkle-2" transform="translate(520, 450)" opacity="0">
        <path
          d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z"
          fill="#C9973A"
          filter="url(#sparkle-glow)"
        />
        <circle cx="0" cy="0" r="2" fill="#E8B84B" />
      </g>

      <g id="sparkle-3" transform="translate(370, 200)" opacity="0">
        <path
          d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
          fill="#E8B84B"
          filter="url(#sparkle-glow)"
        />
        <circle cx="0" cy="0" r="1.5" fill="#FAF3E8" />
      </g>

      <g id="trail-dots" opacity="0.4">
        <circle cx="680" cy="800" r="2" fill="#C9973A" />
        <circle cx="645" cy="710" r="1.5" fill="#C9973A" />
        <circle cx="610" cy="620" r="2" fill="#C9A96E" />
        <circle cx="575" cy="535" r="1.5" fill="#C9A96E" />
        <circle cx="545" cy="455" r="2" fill="#C9973A" />
        <circle cx="510" cy="375" r="1.5" fill="#C9A96E" />
        <circle cx="472" cy="298" r="2" fill="#C9973A" />
        <circle cx="432" cy="225" r="1.5" fill="#C9A96E" />
        <circle cx="385" cy="158" r="2" fill="#C9973A" />
        <circle cx="332" cy="105" r="1.5" fill="#C9A96E" />
      </g>
    </svg>
  );
}

