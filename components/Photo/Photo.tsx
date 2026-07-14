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
    <FadeText delay={delay} className="w-full">
      <figure className="mx-auto w-full max-w-5xl">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            unoptimized
            sizes="(max-width: 768px) 94vw, 1024px"
            className="object-cover grayscale"
          />
        </div>
        {caption ? (
          <figcaption className="mt-6 text-center font-sans text-xs font-light tracking-[0.2em] text-[#666666] uppercase">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </FadeText>
  );
}
