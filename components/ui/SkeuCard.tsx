"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SkeuCardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "article" | "aside";
  hoverLift?: boolean;
};

export function SkeuCard({
  as = "div",
  hoverLift = true,
  className,
  children,
  ...props
}: SkeuCardProps) {
  const Component = motion[as];

  return (
    <Component
      className={cn(
        "sku-surface wood-grain relative overflow-hidden p-6 sm:p-8 transition-shadow",
        hoverLift && "will-change-transform",
        className
      )}
      whileHover={
        hoverLift
          ? { y: -2, boxShadow: "0 10px 30px rgba(92,61,30,0.22)" }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...(props as any)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-multiply" />
      {children}
    </Component>
  );
}

