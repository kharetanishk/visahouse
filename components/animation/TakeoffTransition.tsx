"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { PlaneAnimation } from "./PlaneAnimation";
import { SmokePuffs } from "./SmokePuffs";
import { SmokeCurtain } from "./SmokeCurtain";
import { ContrailTrail } from "./ContrailTrail";

export interface TakeoffTransitionProps {
  countryKey: string;
  onNavigationReady: (key: string) => void;
  onComplete: () => void;
}

function waapi(
  el: Element | null,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
): Animation | null {
  if (!el) return null;
  return el.animate(keyframes, options);
}

function done(anim: Animation | null): Promise<void> {
  if (!anim) return Promise.resolve();
  return anim.finished.then(() => undefined);
}

function pause(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export function TakeoffTransition({
  countryKey,
  onNavigationReady,
  onComplete,
}: TakeoffTransitionProps) {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const finish = React.useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.body.style.overflow = "";
    onComplete();
  }, [onComplete]);

  React.useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";
    let cancelled = false;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelled = true;
        onNavigationReady(countryKey);
        finish();
      }
    };
    window.addEventListener("keydown", onKey);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        run();
      });
    });

    async function run() {
      const root = containerRef.current;
      if (!root || cancelled) return finish();

      const $ = (sel: string) => root.querySelector(sel);
      const vh = window.innerHeight;
      const plane = $("#plane-wrapper") as HTMLElement | null;
      if (!plane) return finish();

      try {
        // ─── PHASE 1: Plane enters from below ──────────────────────
        const enter = waapi(plane, [
          {
            transform: `translateY(${vh * 1.6}px) scale(0.5)`,
            opacity: "0",
          },
          {
            transform: `translateY(${vh * 0.05}px) scale(1)`,
            opacity: "1",
          },
        ], {
          duration: 800,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        });

        // Fire smoke puff 1 while plane is still rising (no separate wait)
        await pause(350);
        if (cancelled) return;
        waapi($("#smoke-puff-1"), [
          { transform: "scale(0)", opacity: "0" },
          { transform: "scale(2)", opacity: "0.8" },
        ], { duration: 300, easing: "ease-out", fill: "forwards" });

        // Start contrail early too
        const trail = $("#contrail-path") as SVGPathElement | null;
        if (trail?.getTotalLength) {
          const len = trail.getTotalLength();
          waapi(trail, [
            { strokeDashoffset: `${len}` },
            { strokeDashoffset: "0" },
          ], { duration: 1200, easing: "ease-out", fill: "forwards" });
        }

        await done(enter);
        if (cancelled) return;

        // ─── PHASE 2: Plane rockets off + clouds start simultaneously ─
        waapi($("#smoke-puff-2"), [
          { transform: "scale(0)", opacity: "0" },
          { transform: "scale(3)", opacity: "0.6" },
        ], { duration: 400, easing: "ease-out", fill: "forwards" });

        waapi($("#smoke-puff-3"), [
          { transform: "scale(0)", opacity: "0" },
          { transform: "scale(5)", opacity: "0.4" },
        ], { duration: 500, delay: 150, easing: "ease-out", fill: "forwards" });

        const flight = waapi(plane, [
          {
            transform: `translateY(${vh * 0.05}px) scale(1)`,
            opacity: "1",
          },
          {
            transform: `translateY(${-vh * 1.6}px) scale(1.35)`,
            opacity: "0",
          },
        ], {
          duration: 850,
          easing: "cubic-bezier(0.45, 0, 0.85, 0.35)",
          fill: "forwards",
        });

        // Clouds start immediately — no separate wait
        const blobs = [
          { sel: "#curtain-blob-1", s: 6, d: 80 },
          { sel: "#curtain-blob-2", s: 5.5, d: 120 },
          { sel: "#curtain-blob-3", s: 5.5, d: 160 },
          { sel: "#curtain-blob-4", s: 5, d: 220 },
          { sel: "#curtain-blob-5", s: 4.5, d: 300 },
        ];

        const curtainDone = Promise.all(
          blobs.map(({ sel, s, d }) =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                const a = waapi($(sel), [
                  { transform: "scale(0)", opacity: "0" },
                  { transform: `scale(${s})`, opacity: "1" },
                ], {
                  duration: 650,
                  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                  fill: "forwards",
                });
                done(a).then(resolve);
              }, d);
            })
          )
        );

        await Promise.all([done(flight), curtainDone]);
        if (cancelled) return;

        // ─── SCREEN IS FULLY COVERED — navigate ────────────────────
        onNavigationReady(countryKey);
        await pause(120);

        // ─── PHASE 3: Clouds part (reveal new page) ────────────────
        const disperseOrder = [
          "#curtain-blob-5",
          "#curtain-blob-4",
          "#curtain-blob-1",
          "#curtain-blob-2",
          "#curtain-blob-3",
        ];
        await Promise.all(
          disperseOrder.map((sel, i) =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                const a = waapi($(sel), [
                  { opacity: "1" },
                  { opacity: "0" },
                ], { duration: 400, easing: "ease-in", fill: "forwards" });
                done(a).then(resolve);
              }, i * 70);
            })
          )
        );

        // ─── Sparkle twinkles ───────────────────────────────────────
        await Promise.all(
          ["#sparkle-1", "#sparkle-2", "#sparkle-3"].map((sel, i) =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                const a = waapi($(sel), [
                  { transform: "scale(0)", opacity: "0" },
                  { transform: "scale(1.5)", opacity: "1", offset: 0.5 },
                  { transform: "scale(0)", opacity: "0" },
                ], { duration: 350, fill: "forwards" });
                done(a).then(resolve);
              }, i * 100);
            })
          )
        );

        finish();
      } catch {
        finish();
      }
    }

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mounted, countryKey, onNavigationReady, finish]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9995,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <ContrailTrail />
      <SmokeCurtain />
      <SmokePuffs />
      <PlaneAnimation />
    </div>,
    document.body
  );
}
