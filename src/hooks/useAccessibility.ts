"use client";

import { useCallback, useEffect, useState } from "react";

export type TextSize = "normal" | "large" | "extra-large";

export interface AccessibilityPreferences {
  selectedFormat: string;
  textSize: TextSize;
  highContrast: boolean;
  reducedMotion: boolean;
}

const STORAGE_KEY = "accesslearn-accessibility";
const CHANGE_EVENT = "accesslearn-accessibility-change";

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  selectedFormat: "Read",
  textSize: "normal",
  highContrast: false,
  reducedMotion: false,
};

const VALID_FORMATS = ["Read", "Listen", "Captions", "Sign Language"];

function readPreferences(): AccessibilityPreferences {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_PREFERENCES;

    const parsed = JSON.parse(saved) as Partial<AccessibilityPreferences>;

    return {
      selectedFormat: VALID_FORMATS.includes(parsed.selectedFormat ?? "")
        ? parsed.selectedFormat!
        : DEFAULT_PREFERENCES.selectedFormat,

      textSize:
        parsed.textSize === "large" ||
        parsed.textSize === "extra-large" ||
        parsed.textSize === "normal"
          ? parsed.textSize
          : DEFAULT_PREFERENCES.textSize,

      highContrast:
        typeof parsed.highContrast === "boolean"
          ? parsed.highContrast
          : DEFAULT_PREFERENCES.highContrast,

      reducedMotion:
        typeof parsed.reducedMotion === "boolean"
          ? parsed.reducedMotion
          : DEFAULT_PREFERENCES.reducedMotion,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function savePreferences(
  preferences: AccessibilityPreferences
): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Keep the current session usable if storage is unavailable.
  }
}

export function useAccessibility() {
  const [preferences, setPreferences] =
    useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPreferences(readPreferences());
    setIsLoaded(true);

    const syncPreferences = () => {
      setPreferences(readPreferences());
    };

    window.addEventListener(CHANGE_EVENT, syncPreferences);
    window.addEventListener("storage", syncPreferences);

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncPreferences);
      window.removeEventListener("storage", syncPreferences);
    };
  }, []);

  const updatePreference = useCallback(
    <K extends keyof AccessibilityPreferences>(
      key: K,
      value: AccessibilityPreferences[K]
    ) => {
      const updated = {
        ...preferences,
        [key]: value,
      };

      savePreferences(updated);
      setPreferences(updated);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [preferences]
  );

  const resetPreferences = useCallback(() => {
    savePreferences(DEFAULT_PREFERENCES);
    setPreferences(DEFAULT_PREFERENCES);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return {
    ...preferences,
    isLoaded,

    setSelectedFormat: (value: string) =>
      updatePreference("selectedFormat", value),

    setTextSize: (value: TextSize) =>
      updatePreference("textSize", value),

    setHighContrast: (value: boolean) =>
      updatePreference("highContrast", value),

    setReducedMotion: (value: boolean) =>
      updatePreference("reducedMotion", value),

    resetPreferences,
  };
}