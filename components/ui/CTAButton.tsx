"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
};

type CTAButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type CTAButtonAsLink = CommonProps & {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  children: React.ReactNode;
};

export function CTAButton(props: CTAButtonAsButton | CTAButtonAsLink) {
  const variant = props.variant ?? "primary";
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-6 sm:px-8 py-3.5 font-body font-bold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/60 disabled:opacity-60 disabled:pointer-events-none";

  const styles =
    variant === "primary"
      ? "text-[#23180A] bg-[#EC9706] shadow-sku-raised border border-[#CB8105] hover:bg-[#D98905] hover:text-[#180F05] hover:shadow-sku-pressed hover:translate-y-px"
      : "text-[#23180A] bg-[#EC9706] border-2 border-[#CB8105] shadow-sku-raised hover:bg-[#D98905] hover:text-[#180F05] hover:border-[#B67304] hover:shadow-sku-pressed hover:translate-y-px";

  const className = cn(base, styles, props.className);

  const href = (props as Partial<CTAButtonAsLink>).href;
  if (typeof href === "string") {
    const linkProps = props as CTAButtonAsLink;
    return (
      <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
        <Link
          href={linkProps.href}
          target={linkProps.target}
          rel={linkProps.rel}
          aria-label={linkProps.ariaLabel}
          className={className}
        >
          {linkProps.children}
        </Link>
      </motion.div>
    );
  }

  const { ariaLabel, variant: _variant, className: _c, ...buttonProps } = props;

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
      <button
        type="button"
        aria-label={ariaLabel}
        className={className}
        {...buttonProps}
      />
    </motion.div>
  );
}

