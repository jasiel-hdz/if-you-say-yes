"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeText } from "@/components/FadeText/FadeText";
import { Display } from "@/components/Typography/Typography";
import type { QuestionSection } from "@/lib/types";

interface QuestionProps {
  section: QuestionSection;
}

const fadeTransition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

function Multiline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {text.split("\n").map((part, index, parts) => (
        <span key={`${index}-${part}`}>
          {part}
          {index < parts.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

function escapeOffset(attempt: number) {
  const distance = 72 + Math.min(attempt, 6) * 18;
  const angle = (attempt * 137.5 * Math.PI) / 180;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * (distance * 0.55);
  return { x, y };
}

export function Question({ section }: QuestionProps) {
  const [accepted, setAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);

  const dodgeNo = useCallback(() => {
    setEscapeCount((count) => {
      const next = count + 1;
      setNoOffset(escapeOffset(next));
      return next;
    });
  }, []);

  return (
    <div className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-24 text-center md:px-16">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            className="relative flex w-full max-w-xl flex-col items-center"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={fadeTransition}
          >
            <FadeText delay={0.1}>
              <Display as="h2" className="text-4xl md:text-5xl">
                {section.name}
              </Display>
            </FadeText>

            <div className="h-28 md:h-36" aria-hidden />

            <FadeText delay={0.3}>
              <Multiline
                text={section.title}
                className="font-display text-3xl font-light leading-[1.35] tracking-[0.02em] text-[#111111] md:text-5xl"
              />
            </FadeText>

            <div className="h-28 md:h-40" aria-hidden />

            <FadeText delay={0.55}>
              <button
                type="button"
                onClick={() => setAccepted(true)}
                className="group relative px-2 pb-3 font-display text-3xl font-light tracking-[0.18em] text-[#000000] transition-opacity duration-700 hover:opacity-70 focus-visible:outline-none md:text-4xl"
              >
                <span className="relative z-10">{section.yesLabel}</span>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-1/2 h-px w-10 -translate-x-1/2 bg-[#111111] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16"
                />
              </button>
            </FadeText>

            <div className="h-14" aria-hidden />

            <div className="relative flex h-16 w-full items-center justify-center">
              <motion.button
                type="button"
                aria-label={section.noLabel}
                onMouseEnter={dodgeNo}
                onFocus={dodgeNo}
                onClick={(event) => {
                  event.preventDefault();
                  dodgeNo();
                }}
                onTouchStart={(event) => {
                  event.preventDefault();
                  dodgeNo();
                }}
                animate={{ x: noOffset.x, y: noOffset.y }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-sans text-[10px] font-light tracking-[0.35em] uppercase text-[#666666] select-none focus-visible:outline-none"
                style={{ touchAction: "none" }}
              >
                {section.noLabel}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="yes"
            className="flex w-full max-w-xl flex-col items-center"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
          >
            <motion.span
              className="mb-12 text-3xl text-[#111111]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...fadeTransition, delay: 0.15 }}
              aria-hidden
            >
              ♥
            </motion.span>
            <div className="space-y-6">
              {section.yesResponse.lines.map((line, index) => (
                <Multiline
                  key={index}
                  text={line}
                  className="font-display text-3xl font-light leading-[1.4] tracking-[0.02em] text-[#111111] md:text-4xl"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
