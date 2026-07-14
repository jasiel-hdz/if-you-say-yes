"use client";

import { Section } from "@/components/Section/Section";
import type { LetterData } from "@/lib/types";

interface LetterProps {
  data: LetterData;
}

export function Letter({ data }: LetterProps) {
  return (
    <main className="relative bg-white text-[#111111]">
      {data.sections.map((section, index) => (
        <Section key={`${section.type}-${index}`} section={section} />
      ))}
    </main>
  );
}
