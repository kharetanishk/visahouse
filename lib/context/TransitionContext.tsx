"use client";

import * as React from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTakeoffTransition } from "@/lib/hooks/useTakeoffTransition";
import { TakeoffTransition } from "@/components/animation/TakeoffTransition";

type TransitionContextValue = {
  isRunning: boolean;
  triggerTakeoff: (countryKey: string) => void;
};

const TransitionContext = React.createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isRunning, targetCountry, triggerTakeoff, onTransitionComplete } = useTakeoffTransition();

  const onNavigationReady = useCallback(
    (countryKey: string) => {
      router.push(`/visa/${countryKey}`);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ isRunning, triggerTakeoff }}>
      {children}
      {isRunning && targetCountry ? (
        <TakeoffTransition
          countryKey={targetCountry}
          onNavigationReady={onNavigationReady}
          onComplete={onTransitionComplete}
        />
      ) : null}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  const ctx = React.useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionContext must be used within TransitionProvider");
  }
  return ctx;
}

