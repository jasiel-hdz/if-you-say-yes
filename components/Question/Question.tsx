"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeText } from "@/components/FadeText/FadeText";
import { Display, Hint } from "@/components/Typography/Typography";
import type { QuestionSection } from "@/lib/types";

interface QuestionProps {
  section: QuestionSection;
}

type Answer = "yes" | "no" | null;

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

export function Question({ section }: QuestionProps) {
  const [answer, setAnswer] = useState<Answer>(null);

  return (
    <div className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-24 text-center md:px-16">
      <AnimatePresence mode="wait">
        {answer === null ? (
          <motion.div
            key="ask"
            className="flex w-full max-w-xl flex-col items-center"
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
                onClick={() => setAnswer("yes")}
                className="font-sans text-sm font-light tracking-[0.4em] uppercase text-[#000000] transition-opacity duration-700 hover:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111]"
              >
                Yes
              </button>
            </FadeText>

            <div className="h-10" aria-hidden />

            <FadeText delay={0.7}>
              <button
                type="button"
                onClick={() => setAnswer("no")}
                className="font-sans text-[10px] font-light tracking-[0.35em] uppercase text-[#666666] transition-opacity duration-700 hover:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DDDDDD]"
              >
                No
              </button>
            </FadeText>
          </motion.div>
        ) : answer === "yes" ? (
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
        ) : (
          <motion.div
            key="no"
            className="flex w-full max-w-xl flex-col items-center space-y-8"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
          >
            {section.noResponse.lines.map((line, index) => (
              <Multiline
                key={index}
                text={line}
                className="font-display text-2xl font-light leading-[1.5] tracking-[0.02em] text-[#111111] md:text-3xl"
              />
            ))}
            <Hint className="pt-4">With care.</Hint>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
