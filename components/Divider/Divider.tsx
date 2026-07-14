"use client";

import { motion } from "framer-motion";

interface DividerProps {
  className?: string;
  delay?: number;
}

export function Divider({ className = "", delay = 0 }: DividerProps) {
  return (
    <motion.div
      className={`mx-auto h-px w-16 origin-center bg-[#111111] ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      aria-hidden
    />
  );
}

export function ThinRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-full max-w-xs bg-[#DDDDDD] ${className}`}
      aria-hidden
    />
  );
}
