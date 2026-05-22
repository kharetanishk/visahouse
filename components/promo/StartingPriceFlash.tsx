"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { STARTING_PRICE_LABEL } from "@/lib/constants/pricing";
import { cn } from "@/lib/utils";

const FLASH_POSITIONS = [
  "top-24 left-3 sm:left-8",
  "top-28 right-3 sm:right-8",
  "top-[38%] left-4",
  "top-[42%] right-4",
  "bottom-32 left-4 sm:left-10",
  "bottom-36 right-4 sm:right-10",
  "bottom-28 left-1/2 -translate-x-1/2",
] as const;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickPosition(exclude?: string) {
  const pool = exclude
    ? FLASH_POSITIONS.filter((p) => p !== exclude)
    : [...FLASH_POSITIONS];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function StartingPriceFlash() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState<string>(FLASH_POSITIONS[0]);
  const lastPosition = React.useRef<string>(FLASH_POSITIONS[0]);
  const timersRef = React.useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const queue = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  React.useEffect(() => {
    const cycle = () => {
      const next = pickPosition(lastPosition.current);
      lastPosition.current = next;
      setPosition(next);
      setVisible(true);

      const showMs = reduceMotion ? 5000 : randomBetween(2800, 4200);
      queue(() => {
        setVisible(false);
        const gapMs = reduceMotion
          ? randomBetween(12000, 18000)
          : randomBetween(4500, 11000);
        queue(cycle, gapMs);
      }, showMs);
    };

    const startMs = reduceMotion ? 8000 : randomBetween(2500, 5000);
    queue(cycle, startMs);

    return clearTimers;
  }, [reduceMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={position}
            role="status"
            aria-label={STARTING_PRICE_LABEL}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={cn("absolute max-w-[min(92vw,320px)]", position)}
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 0 rgba(201,151,58,0.0)",
                        "0 0 24px 4px rgba(201,151,58,0.45)",
                        "0 0 0 0 rgba(201,151,58,0.0)",
                      ],
                      scale: [1, 1.04, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-accent-gold/70",
                "bg-gradient-to-r from-[rgba(253,248,240,0.97)] via-[rgba(255,250,235,0.98)] to-[rgba(253,248,240,0.97)]",
                "px-4 py-2.5 shadow-[0_8px_28px_rgba(201,151,58,0.35),0_4px_12px_rgba(28,47,74,0.12)]",
                "backdrop-blur-sm"
              )}
            >
              <Sparkles
                className="h-4 w-4 shrink-0 text-accent-gold"
                aria-hidden
              />
              <span className="font-display text-sm font-bold tracking-tight text-accent-burgundy sm:text-base">
                {STARTING_PRICE_LABEL}
              </span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
