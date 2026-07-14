"use client";

import { FadeLines, FadeText } from "@/components/FadeText/FadeText";
import { Divider } from "@/components/Divider/Divider";
import { Photo } from "@/components/Photo/Photo";
import { Question } from "@/components/Question/Question";
import { Display, Hint } from "@/components/Typography/Typography";
import type { LetterSection } from "@/lib/types";

interface SectionProps {
  section: LetterSection;
}

export function Section({ section }: SectionProps) {
  switch (section.type) {
    case "intro":
      return <IntroSection section={section} />;
    case "story":
      return <StorySection section={section} />;
    case "statement":
      return <StatementSection section={section} />;
    case "gallery":
      return <GallerySection section={section} />;
    case "closing":
      return <ClosingSection section={section} />;
    case "question":
      return <Question section={section} />;
    default:
      return null;
  }
}

function IntroSection({
  section,
}: {
  section: Extract<LetterSection, { type: "intro" }>;
}) {
  return (
    <section className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-24 text-center md:px-20">
      <Divider />

      <div className="h-14" aria-hidden />

      <FadeText delay={0.15}>
        <Display as="h1" className="text-5xl md:text-6xl lg:text-7xl">
          {section.title}
        </Display>
      </FadeText>

      {section.date ? (
        <FadeText delay={0.3} className="mt-8">
          <Hint>{section.date}</Hint>
        </FadeText>
      ) : null}

      <div className="h-14" aria-hidden />

      <Divider delay={0.35} />

      <div className="h-24 md:h-32" aria-hidden />

      <FadeLines
        lines={section.content}
        delay={0.5}
        className="mx-auto max-w-md space-y-8"
        lineClassName="font-sans text-base font-light leading-[1.9] tracking-[0.02em] text-[#111111] md:text-lg"
      />

      {section.hint ? (
        <>
          <div className="h-28 md:h-36" aria-hidden />
          <FadeText delay={1}>
            <Hint>{section.hint}</Hint>
          </FadeText>
        </>
      ) : null}
    </section>
  );
}

function StorySection({
  section,
}: {
  section: Extract<LetterSection, { type: "story" }>;
}) {
  return (
    <section className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-28 text-center md:px-20">
      <Divider />

      <div className="h-16 md:h-20" aria-hidden />

      {section.title ? (
        <FadeText delay={0.1}>
          <Display as="h2" className="text-3xl md:text-4xl">
            {section.title}
          </Display>
        </FadeText>
      ) : null}

      <div className={section.title ? "h-16 md:h-24" : "h-4"} aria-hidden />

      <FadeLines
        lines={section.content}
        delay={0.25}
        className="mx-auto max-w-md space-y-10"
        lineClassName="font-sans text-base font-light leading-[1.9] tracking-[0.02em] text-[#111111] md:text-lg"
      />

      <div className="h-16 md:h-20" aria-hidden />

      <Divider delay={0.6} />
    </section>
  );
}

function StatementSection({
  section,
}: {
  section: Extract<LetterSection, { type: "statement" }>;
}) {
  return (
    <section className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-28 text-center md:px-20">
      <Divider />

      <div className="h-20 md:h-28" aria-hidden />

      <FadeLines
        lines={section.content}
        delay={0.2}
        stagger={0.35}
        className="mx-auto max-w-2xl space-y-10"
        lineClassName="font-display text-3xl font-light leading-[1.4] tracking-[0.02em] text-[#111111] md:text-5xl"
      />

      <div className="h-20 md:h-28" aria-hidden />

      <Divider delay={0.8} />
    </section>
  );
}

function GallerySection({
  section,
}: {
  section: Extract<LetterSection, { type: "gallery" }>;
}) {
  return (
    <section className="letter-section mx-auto flex w-full max-w-4xl flex-col items-center gap-28 px-8 py-32 md:gap-40 md:px-16">
      {section.images.map((src, index) => (
        <Photo
          key={src}
          src={src}
          alt={section.captions?.[index] ?? `Photograph ${index + 1}`}
          caption={section.captions?.[index]}
          delay={0.1}
          priority={index === 0}
        />
      ))}
    </section>
  );
}

function ClosingSection({
  section,
}: {
  section: Extract<LetterSection, { type: "closing" }>;
}) {
  return (
    <section className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-8 py-28 text-center md:px-20">
      <div className="h-16" aria-hidden />

      <FadeLines
        lines={section.content}
        delay={0.15}
        stagger={0.3}
        className="mx-auto max-w-lg space-y-8"
        lineClassName="font-display text-3xl font-light leading-[1.45] tracking-[0.02em] text-[#111111] md:text-4xl"
      />

      {section.hint ? (
        <>
          <div className="h-28 md:h-36" aria-hidden />
          <FadeText delay={1.1}>
            <Hint>{section.hint}</Hint>
          </FadeText>
        </>
      ) : null}
    </section>
  );
}
