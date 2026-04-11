"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

type TransitionState = "idle" | "running" | "complete";

export function useTakeoffTransition() {
  const router = useRouter();
  const [state, setState] = useState<TransitionState>("idle");
  const [targetCountry, setTargetCountry] = useState<string | null>(null);

  const triggerTakeoff = useCallback(
    (countryKey: string) => {
      if (state === "running") return; // prevent double-trigger

      // Prefetch immediately so the page bundle is ready before animation ends.
      router.prefetch(`/visa/${countryKey}`);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        router.push(`/visa/${countryKey}`);
        return;
      }

      setTargetCountry(countryKey);
      setState("running");
    },
    [router, state]
  );

  const onNavigationReady = useCallback(
    (countryKey: string) => {
      // Called at the 1000ms mark when screen is covered
      router.push(`/visa/${countryKey}`);
    },
    [router]
  );

  const onTransitionComplete = useCallback(() => {
    setState("complete");
    setTargetCountry(null);
    setTimeout(() => setState("idle"), 100);
  }, []);

  return {
    state,
    targetCountry,
    isRunning: state === "running",
    triggerTakeoff,
    onNavigationReady,
    onTransitionComplete,
  };
}

