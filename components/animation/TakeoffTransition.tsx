"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useAnimate } from "framer-motion";

import { PlaneAnimation } from "./PlaneAnimation";
import { SmokePuffs } from "./SmokePuffs";
import { SmokeCurtain } from "./SmokeCurtain";
import { ContrailTrail } from "./ContrailTrail";

export interface TakeoffTransitionProps {
  countryKey: string;
  onNavigationReady: (key: string) => void;
  onComplete: () => void;
}

export function TakeoffTransition({ countryKey, onNavigationReady, onComplete }: TakeoffTransitionProps) {
  const [mounted, setMounted] = React.useState(false);
  const [scope, animate] = useAnimate();
  const completedRef = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const finish = React.useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    document.body.style.overflow = "";
    onComplete();
  }, [onComplete]);

  const abort = React.useCallback(() => {
    if (completedRef.current) return;
    onNavigationReady(countryKey);
    finish();
  }, [countryKey, finish, onNavigationReady]);

  React.useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";

    // Framer Motion's `useAnimate` has some strict overloads in TS; we keep usage
    // correct at runtime while making types permissive here.
    const a = animate as unknown as (
      target: string | Element,
      keyframes: Record<string, unknown>,
      options?: Record<string, unknown>
    ) => Promise<unknown>;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") abort();
    };
    window.addEventListener("keydown", onKeyDown);

    let cancelled = false;

    const runSequence = async () => {
      document.body.style.overflow = "hidden";

      // ── PHASE 1: Plane enters from below ──────────────────────
      // Start: off-screen bottom, small
      const vh = typeof window !== "undefined" ? window.innerHeight : 900;

      const root = scope.current as HTMLElement | null;
      const plane = root?.querySelector("#plane-wrapper") as HTMLElement | null;
      if (!plane) {
        throw new Error("Portal DOM not ready");
      }

      await a(
        plane,
        { y: vh * 1.4, scale: 0.5, opacity: 0 },
        { duration: 0 }
      );

      // ── PHASE 2/3: Single continuous flight (uniform speed) ────
      // We animate position linearly (uniform velocity), while handling opacity separately
      // to avoid a "mid-screen pause then rocket" feeling.
      const flightDuration = 1.75;

      // Fade in quickly (parallel)
      a(plane, { opacity: 1 }, { duration: 0.2, ease: "easeOut" });

      // Start contrail drawing (don't await)
      const contrailPath = root?.querySelector("#contrail-path") ?? document.getElementById("contrail-path");
      if (contrailPath) {
        const len = ((contrailPath as unknown as SVGPathElement).getTotalLength?.() ?? 800) as number;
        a(
          contrailPath as unknown as Element,
          { strokeDashoffset: [len, 0] },
          { duration: 1.2, ease: "easeOut" }
        );
      }

      // Smoke puffs (parallel)
      a(
        "#smoke-puff-1",
        { scale: [0, 1.2], opacity: [0, 0.85] },
        { duration: 0.25, delay: 0.25, ease: "easeOut" }
      );
      a(
        "#smoke-puff-2",
        { scale: [0, 1.8], opacity: [0, 0.6] },
        { duration: 0.35, delay: 0.4, ease: "easeOut" }
      );
      a(
        "#smoke-puff-3",
        { scale: [0, 3], opacity: [0, 0.4] },
        { duration: 0.4, delay: 1.05, ease: "easeOut" }
      );

      // Start smoke curtain so it completes as the plane disappears
      const coverStart = 1.05;
      const curtainCover = Promise.all([
        a(
          "#curtain-blob-1",
          { scale: [0, 4], opacity: [0, 1] },
          { duration: 0.65, delay: coverStart, ease: [0.22, 1, 0.36, 1] }
        ),
        a(
          "#curtain-blob-2",
          { scale: [0, 3.5], opacity: [0, 0.95] },
          { duration: 0.6, delay: coverStart + 0.04, ease: [0.22, 1, 0.36, 1] }
        ),
        a(
          "#curtain-blob-3",
          { scale: [0, 3.5], opacity: [0, 0.95] },
          { duration: 0.6, delay: coverStart + 0.08, ease: [0.22, 1, 0.36, 1] }
        ),
        a(
          "#curtain-blob-4",
          { scale: [0, 3], opacity: [0, 0.9] },
          { duration: 0.55, delay: coverStart + 0.12, ease: [0.22, 1, 0.36, 1] }
        ),
        a(
          "#curtain-blob-5",
          { scale: [0, 2.5], opacity: [0, 0.92] },
          { duration: 0.5, delay: coverStart + 0.18, ease: [0.22, 1, 0.36, 1] }
        ),
      ]);

      // Linear flight from bottom off-screen → far above top
      const flight = a(
        plane,
        { y: -vh * 1.3, scale: 1.5 },
        { duration: flightDuration, ease: [0, 0, 1, 1] }
      );

      // Fade out near the end (parallel)
      a(plane, { opacity: 0 }, { duration: 0.2, delay: flightDuration - 0.18, ease: "easeIn" });

      // Wait for both flight and full cover so navigation happens exactly at cover completion
      await Promise.all([flight, curtainCover]);

      // ── SCREEN IS NOW FULLY COVERED ───────────────────────────
      onNavigationReady(countryKey);

      // Keep this extremely short to avoid perceived lag.
      await new Promise((r) => setTimeout(r, 80));

      // ── PHASE 5: CURTAIN DISPERSES (new page revealed) ────────
      await Promise.all([
        a("#curtain-blob-5", { opacity: 0, scale: 2 }, { duration: 0.4, ease: "easeIn" }),
        a("#curtain-blob-4", { opacity: 0, scale: 2.5 }, { duration: 0.4, delay: 0.06, ease: "easeIn" }),
        a("#curtain-blob-1", { opacity: 0, scale: 3.5 }, { duration: 0.45, delay: 0.1, ease: "easeIn" }),
        a("#curtain-blob-2", { opacity: 0, scale: 3 }, { duration: 0.4, delay: 0.14, ease: "easeIn" }),
        a("#curtain-blob-3", { opacity: 0, scale: 3 }, { duration: 0.4, delay: 0.18, ease: "easeIn" }),
      ]);

      // ── PHASE 6: SPARKLES TWINKLE ─────────────────────────────
      await Promise.all([
        a("#sparkle-1", { scale: [0, 1.2, 0], opacity: [0, 1, 0] }, { duration: 0.4 }),
        a("#sparkle-2", { scale: [0, 1.2, 0], opacity: [0, 1, 0] }, { duration: 0.4, delay: 0.1 }),
        a("#sparkle-3", { scale: [0, 1.2, 0], opacity: [0, 1, 0] }, { duration: 0.4, delay: 0.2 }),
      ]);

      // ── CLEANUP ───────────────────────────────────────────────
      document.body.style.overflow = "";
      onComplete();
    };

    // Ensure the portal DOM is mounted before querying/animating.
    let raf = 0;
    const tick = () => {
      raf = window.requestAnimationFrame(() => {
        runSequence()
          .catch(() => tick());
      });
    };
    tick();

    return () => {
      window.cancelAnimationFrame(raf);
      cancelled = true;
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abort, animate, countryKey, finish, mounted, onNavigationReady, scope, onComplete]);

  /*
  runSequence().catch(() => {
      // If anything goes wrong, fail safe: unlock scroll and complete
      finish();
    });
  */

  if (!mounted) return null;

  return createPortal(
    <div
      ref={scope}
      style={{ position: "fixed", inset: 0, zIndex: 9995, pointerEvents: "none" }}
      aria-hidden="true"
      role="presentation"
    >
      <ContrailTrail />
      <SmokeCurtain />
      <SmokePuffs />
      <PlaneAnimation />
    </div>,
    document.body
  );
}

