import type { ReactNode } from "react";

interface DisplayProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p";
}

export function Display({
  children,
  className = "",
  as: Tag = "h1",
}: DisplayProps) {
  return (
    <Tag
      className={`font-display font-light tracking-[0.02em] text-[#111111] ${className}`}
    >
      {children}
    </Tag>
  );
}

interface BodyProps {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}

export function Body({ children, className = "", muted = false }: BodyProps) {
  return (
    <p
      className={`font-sans font-light leading-[1.85] tracking-[0.01em] ${
        muted ? "text-[#666666]" : "text-[#111111]"
      } ${className}`}
    >
      {children}
    </p>
  );
}

interface HintProps {
  children: ReactNode;
  className?: string;
}

export function Hint({ children, className = "" }: HintProps) {
  return (
    <span
      className={`font-sans text-[11px] font-light uppercase tracking-[0.35em] text-[#666666] ${className}`}
    >
      {children}
    </span>
  );
}
