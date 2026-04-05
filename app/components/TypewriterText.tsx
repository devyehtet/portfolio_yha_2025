"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
};

export default function TypewriterText({
  text,
  speed = 85,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        const frameId = window.requestAnimationFrame(() => {
          setDisplayText(text);
        });

        return () => window.cancelAnimationFrame(frameId);
      }
    }

    let currentIndex = 0;
    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setDisplayText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [speed, text]);

  const isComplete = displayText.length >= text.length;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText}
        <span
          className={`typewriter-caret ${isComplete ? "is-complete" : ""}`}
        />
      </span>
    </>
  );
}
