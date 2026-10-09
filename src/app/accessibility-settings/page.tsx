"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Contrast,
  Accessibility,
  RotateCcw,
  Volume2,
  Captions,
  BookOpen,
  Hand,
} from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

export default function AccessibilitySettingsPage() {
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    selectedFormat,
    setSelectedFormat,
    resetPreferences,
    isLoaded,
  } = useAccessibility();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p role="status">Loading accessibility settings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-blue-700 hover:underline"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <Accessibility size={28} aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-700">
                PERSONALISE YOUR EXPERIENCE
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">
                Accessibility Settings
              </h1>
            </div>
          </div>

          <p className="max-w-2xl leading-7 text-slate-600">
            Adjust how AccessLearn looks and how you prefer to learn.
            Your preferences are saved on this device.
          </p>
        </header>

        <div className="space-y-6">
          <section
            aria-labelledby="text-size-heading"
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <Eye size={24} className="text-blue-700" aria-hidden="true" />
              <div>
                <h2 id="text-size-heading" className="text-xl font-bold">
                  Text size
                </h2>
                <p className="text-sm text-slate-600">
                  Choose a comfortable reading size.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { value: "normal", label: "Normal", sample: "Aa" },
                { value: "large", label: "Large", sample: "Aa" },
                {
                  value: "extra-large",
                  label: "Extra Large",
                  sample: "Aa",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={textSize === option.value}
                  onClick={() =>
                    setTextSize(
                      option.value as "normal" | "large" | "extra-large"
                    )
                  }
                  className={`min-h-24 rounded-xl border-2 p-4 text-left ${
                    textSize === option.value
                      ? "border-blue-700 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <span className="block text-2xl font-bold">
                    {option.sample}
                  </span>
                  <span className="mt-1 block font-semibold">
                    {option.label}
                  </span>
                  {textSize === option.value && (
                    <span className="mt-1 block text-sm text-blue-800">
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="display-heading"
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <Contrast
                size={24}
                className="text-blue-700"
                aria-hidden="true"
              />
              <div>
                <h2 id="display-heading" className="text-xl font-bold">
                  Display and motion
                </h2>
                <p className="text-sm text-slate-600">
                  Adjust visual contrast and animations.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              <label className="flex min-h-20 cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block font-semibold">High contrast</span>
                  <span className="mt-1 block text-sm text-slate-600">
                    Increase contrast to make content easier to distinguish.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(event) => setHighContrast(event.target.checked)}
                  className="h-6 w-6 shrink-0 accent-blue-700"
                />
              </label>

              <label className="flex min-h-20 cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block font-semibold">Reduce motion</span>
                  <span className="mt-1 block text-sm text-slate-600">
                    Minimise animations and transitions.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(event) => setReducedMotion(event.target.checked)}
                  className="h-6 w-6 shrink-0 accent-blue-700"
                />
              </label>
            </div>
          </section>

          <section
            aria-labelledby="learning-format-heading"
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <BookOpen
                size={24}
                className="text-blue-700"
                aria-hidden="true"
              />
              <div>
                <h2
                  id="learning-format-heading"
                  className="text-xl font-bold"
                >
                  Preferred learning format
                </h2>
                <p className="text-sm text-slate-600">
                  Choose your preferred way to access lesson content.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Read",
                  description: "Read written lesson content.",
                  icon: BookOpen,
                },
                {
                  label: "Listen",
                  description: "Listen using text-to-speech where supported.",
                  icon: Volume2,
                },
                {
                  label: "Captions",
                  description: "Use text transcripts and captions where available.",
                  icon: Captions,
                },
                {
                  label: "Sign Language",
                  description: "Check for sign-language resources where available.",
                  icon: Hand,
                },
              ].map((format) => {
                const Icon = format.icon;
                const selected = selectedFormat === format.label;

                return (
                  <button
                    key={format.label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedFormat(format.label)}
                    className={`flex min-h-24 items-start gap-4 rounded-xl border-2 p-4 text-left ${
                      selected
                        ? "border-blue-700 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <Icon
                      size={23}
                      className="mt-1 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-bold">{format.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        {format.description}
                      </span>
                      {selected && (
                        <span className="mt-2 block text-sm font-semibold text-blue-800">
                          Selected
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-lg font-bold">Reset preferences</h2>
              <p className="mt-1 text-sm text-slate-600">
                Restore the default accessibility settings.
              </p>
            </div>

            <button
              type="button"
              onClick={resetPreferences}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Reset settings
            </button>
          </section>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-600">
          Accessibility needs differ from person to person. You can return
          here at any time to change these preferences.
        </p>
      </div>
    </main>
  );
}