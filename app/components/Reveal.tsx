"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  variant?: "up" | "left" | "right" | "scale";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.18,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-block reveal-${variant} ${
        isVisible ? "is-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
