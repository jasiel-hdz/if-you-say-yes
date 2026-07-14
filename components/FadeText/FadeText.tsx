"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

interface FadeTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h1" | "h2" | "span";
}

export function FadeText({
  children,
  className = "",
  delay = 0,
  as = "div",
}: FadeTextProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}

interface FadeLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}

export function FadeLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.18,
}: FadeLinesProps) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <FadeText
          key={`${index}-${line.slice(0, 24)}`}
          as="p"
          delay={delay + index * stagger}
          className={lineClassName}
        >
          {line.split("\n").map((part, partIndex, parts) => (
            <span key={`${partIndex}-${part}`}>
              {part}
              {partIndex < parts.length - 1 ? <br /> : null}
            </span>
          ))}
        </FadeText>
      ))}
    </div>
  );
}
