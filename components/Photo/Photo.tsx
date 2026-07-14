"use client";

import Image from "next/image";
import { FadeText } from "@/components/FadeText/FadeText";

interface PhotoProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  delay?: number;
}

export function Photo({
  src,
  alt,
  caption,
  priority = false,
  delay = 0,
}: PhotoProps) {
  return (
    <FadeText
      delay={delay}
      className="letter-section flex min-h-[100svh] w-full flex-col items-center justify-center px-10 py-24 md:px-20"
    >
      <figure className="mx-auto flex w-full max-w-[340px] flex-col items-center md:max-w-[420px]">
        <div className="overflow-hidden bg-[#f5f5f5]">
          <Image
            src={src}
            alt={alt}
            width={840}
            height={1050}
            priority={priority}
            unoptimized
            className="h-auto w-full object-contain grayscale"
          />
        </div>
        {caption ? (
          <figcaption className="mt-10 text-center font-sans text-[10px] font-light tracking-[0.2em] text-[#666666] uppercase">
            {caption.split("\n").map((part, index, parts) => (
              <span key={`${index}-${part}`}>
                {part}
                {index < parts.length - 1 ? <br /> : null}
              </span>
            ))}
          </figcaption>
        ) : null}
      </figure>
    </FadeText>
  );
}
