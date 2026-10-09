"use client";

import { useEffect } from "react";
import { useAccessibility } from "@/hooks/useAccessibility";

export default function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    textSize,
    highContrast,
    reducedMotion,
    isLoaded,
  } = useAccessibility();

  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;

    root.classList.remove(
      "accessibility-text-large",
      "accessibility-text-extra-large"
    );

    if (textSize === "large") {
      root.classList.add("accessibility-text-large");
    } else if (textSize === "extra-large") {
      root.classList.add("accessibility-text-extra-large");
    }

    root.classList.toggle(
      "accessibility-high-contrast",
      highContrast
    );

    root.classList.toggle(
      "accessibility-reduced-motion",
      reducedMotion
    );
  }, [textSize, highContrast, reducedMotion, isLoaded]);

  return <>{children}</>;
}